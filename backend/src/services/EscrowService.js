// src/services/EscrowService.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Transaction = require('../models/Transaction');
const OperatorService = require('./OperatorService');

/**
 * EscrowService manages the secure transfer of assets and funds.
 * It ensures that a buyer's funds are locked until the asset is fully verified 
 * via Operator APIs, after which the asset is transferred and funds are released to the seller.
 */
class EscrowService {
  
  /**
   * Step 1: Lock buyer's funds into an Escrow state.
   */
  async lockFunds(buyerId, ticketId, amount) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const buyer = await User.findById(buyerId).session(session);
      const ticket = await Ticket.findById(ticketId).session(session);

      if (!buyer || !ticket) {
        throw new Error('Buyer or Ticket not found');
      }

      if (buyer.wallet.balance < amount) {
        throw new Error('Insufficient wallet balance to secure this asset');
      }

      if (ticket.status !== 'approved') {
        throw new Error('Ticket is no longer available on the market');
      }

      // Deduct from buyer
      buyer.wallet.balance -= amount;
      await buyer.save({ session });

      // Create an escrow transaction record
      const transaction = await Transaction.create([{
        user: buyerId,
        type: 'purchase',
        amount: amount,
        ticket: ticketId,
        status: 'pending', // Pending implies Escrow Locked
        reference: `ESCROW-LOCK-${Date.now()}`
      }], { session });

      // Temporarily mark ticket as sold so others can't buy it
      ticket.status = 'sold';
      await ticket.save({ session });

      await session.commitTransaction();
      session.endSession();

      return { success: true, transactionId: transaction[0]._id };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  /**
   * Step 2: Verify the asset with the Operator and release funds if successful.
   */
  async verifyAndRelease(transactionId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transaction = await Transaction.findById(transactionId).populate('ticket').session(session);
      if (!transaction || transaction.status !== 'pending') {
        throw new Error('Invalid or already processed transaction');
      }

      const ticket = transaction.ticket;
      const seller = await User.findById(ticket.seller).session(session);

      // Verify PNR with Operator API
      const verification = await OperatorService.verifyPNR(ticket.pnr, ticket.operator, {
        source: ticket.source,
        destination: ticket.destination,
        travelDate: ticket.travelDate
      });

      if (!verification.isValid) {
        // Verification failed. Refund the buyer.
        const buyer = await User.findById(transaction.user).session(session);
        buyer.wallet.balance += transaction.amount;
        await buyer.save({ session });

        // Revert ticket status or mark as rejected due to fraud
        ticket.status = 'rejected';
        ticket.verificationNotes = `Escrow Verification Failed: ${verification.reason}`;
        await ticket.save({ session });

        // Mark transaction as failed
        transaction.status = 'failed';
        await transaction.save({ session });

        await session.commitTransaction();
        session.endSession();

        return { success: false, reason: verification.reason, action: 'REFUNDED_BUYER' };
      }

      // Verification Passed. Release funds to seller.
      // Deducting 5% platform fee for TravelSwap
      const platformFee = transaction.amount * 0.05;
      const sellerPayout = transaction.amount - platformFee;

      seller.wallet.balance += sellerPayout;
      await seller.save({ session });

      // Create a release transaction for the seller
      await Transaction.create([{
        user: seller._id,
        type: 'sale',
        amount: sellerPayout,
        ticket: ticket._id,
        status: 'completed',
        reference: `ESCROW-RELEASE-${transaction._id}`
      }], { session });

      // Mark original transaction as completed
      transaction.status = 'completed';
      await transaction.save({ session });

      await session.commitTransaction();
      session.endSession();

      return { success: true, action: 'FUNDS_RELEASED_TO_SELLER', payout: sellerPayout };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = new EscrowService();
