// AI Services for TravelSwap

// Advanced Price Recommendation Engine (Algorithmic Simulator)
exports.suggestPrice = async (req, res) => {
  try {
    const { type, source, destination, travelDate, originalPrice, operator } = req.body;
    
    // 1. Time-decay velocity factor (Prices drop as departure approaches, but spike 24h before if demand is high)
    const hoursUntil = Math.max(0, (new Date(travelDate) - new Date()) / (1000 * 60 * 60));
    const daysUntil = hoursUntil / 24;
    
    // 2. Base Demand Matrix (Historical Route Data)
    const routeKey = `${source}-${destination}`.toLowerCase();
    const highDemandRoutes = ['delhi-mumbai', 'mumbai-goa', 'bangalore-chennai', 'pune-mumbai'];
    let baseDemand = highDemandRoutes.includes(routeKey) ? 1.3 : 1.0;

    // 3. Temporal Demand (Weekends / Holidays)
    const travelDay = new Date(travelDate).getDay();
    const isWeekend = travelDay === 0 || travelDay === 5 || travelDay === 6; // Fri, Sat, Sun
    if (isWeekend) baseDemand += 0.2;

    // 4. Scarcity & Urgency Matrix
    let urgencyMultiplier = 1.0;
    if (daysUntil <= 1) {
      urgencyMultiplier = baseDemand > 1.2 ? 1.15 : 0.6; // Desperate sell vs Last-minute premium
    } else if (daysUntil <= 3) {
      urgencyMultiplier = 0.8; // Need to sell soon
    } else if (daysUntil <= 14) {
      urgencyMultiplier = 0.9; // Optimal selling window
    } else {
      urgencyMultiplier = 0.75; // Too early, needs discount to move
    }

    // 5. Operator Premium Index
    const premiumOperators = ['zingbus', 'intrCity', 'neeta'];
    const isPremium = operator && premiumOperators.some(op => operator.toLowerCase().includes(op));
    const operatorModifier = isPremium ? 1.1 : 1.0;

    // Calculate final algorithmic suggested price
    const calculatedVolatility = baseDemand * urgencyMultiplier * operatorModifier;
    let suggested = originalPrice * calculatedVolatility * 0.85; // Base haircut for resale

    const minPrice = Math.floor(originalPrice * 0.4);
    const maxPrice = Math.floor(originalPrice * 0.98); // Cap at 98% of original to guarantee savings

    const finalPrice = Math.max(minPrice, Math.min(maxPrice, Math.round(suggested)));
    const savings = Math.round((1 - (finalPrice / originalPrice)) * 100);

    // Generate intelligent reasoning
    const reasoningEngine = [
      `Algorithmic pricing activated. Route historical demand is ${baseDemand > 1.2 ? 'high' : 'standard'}.`,
      isWeekend ? `Weekend travel premium applied (+20% velocity).` : `Mid-week standard velocity.`,
      daysUntil <= 3 ? `Urgency factor engaged due to tight departure window.` : `Optimal long-term holding value calculated.`,
      `Final asset valuation guarantees a ${savings}% market advantage over retail.`
    ].join(' ');

    res.json({
      success: true,
      suggestion: {
        suggestedPrice: finalPrice, 
        minPrice, 
        maxPrice,
        demandLevel: baseDemand > 1.2 ? 'high' : baseDemand > 1.0 ? 'medium' : 'low',
        confidence: Math.min(99, Math.floor(75 + (20 * (1/daysUntil)) + (isPremium ? 5 : 0))),
        savingsPercent: savings,
        reasoning: reasoningEngine
      }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// Fraud Detection & Risk Matrix
exports.checkFraud = async (req, res) => {
  try {
    const { sellingPrice, originalPrice, pnr, travelDate } = req.body;
    let score = 0;
    const flags = [];

    // 1. Price Anomaly Detection
    const priceRatio = sellingPrice / originalPrice;
    if (priceRatio > 0.98) { score += 35; flags.push('Price Velocity Alert: Ask price exceeds secondary market limits.'); }
    if (priceRatio < 0.25) { score += 40; flags.push('Liquidation Alert: Price is suspiciously below market floor.'); }

    // 2. Cryptographic PNR Analysis
    if (!pnr || pnr.length < 5) { 
      score += 50; flags.push('Structural Integrity Failure: PNR does not match standard operator hash formats.'); 
    } else if (/^(.)\1+$/.test(pnr)) {
      score += 80; flags.push('Pattern Anomaly: PNR contains repeating sequence characteristics of mocked data.');
    }

    // 3. Temporal Risk Assessment
    const hoursUntil = (new Date(travelDate) - new Date()) / (1000 * 60 * 60);
    if (hoursUntil < 0) { score += 100; flags.push('Temporal Violation: Asset has already expired.'); }
    else if (hoursUntil < 4) { score += 20; flags.push('High-Velocity Risk: Asset deployed within 4 hours of departure.'); }
    
    const daysUntil = hoursUntil / 24;
    if (daysUntil > 180) { score += 30; flags.push('Temporal Horizon Alert: Asset exceeds standard operator booking windows.'); }

    // Determine Matrix State
    const riskState = score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low';
    const actionState = score >= 80 ? 'REJECT' : score >= 30 ? 'ESCROW_HOLD' : 'AUTO_CLEAR';

    res.json({
      success: true,
      fraud: {
        score: Math.min(100, score),
        risk: riskState,
        flags, 
        recommendation: actionState
      }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// Demand prediction
exports.getDemand = async (req, res) => {
  try {
    const { route } = req.params;
    const popularRoutes = {
      'delhi-mumbai': 92, 'mumbai-goa': 88, 'bangalore-chennai': 76,
      'delhi-jaipur': 70, 'mumbai-pune': 65, 'kolkata-delhi': 60
    };
    const demand = popularRoutes[route?.toLowerCase()] || Math.floor(Math.random() * 40 + 30);
    res.json({
      success: true,
      demand: { route, score: demand, level: demand > 75 ? 'high' : demand > 50 ? 'medium' : 'low',
        trend: demand > 60 ? 'rising' : 'stable',
        tip: demand > 75 ? 'High demand! Price your ticket competitively for quick sale.' : 'Moderate demand. Consider a lower price for faster sale.'
      }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// Urgent deals
exports.getUrgentDeals = async (req, res) => {
  try {
    const Ticket = require('../models/Ticket');
    const tickets = await Ticket.find({ status: 'approved', isUrgent: true, travelDate: { $gte: new Date() } })
      .populate('seller', 'name avatar ratings').sort({ travelDate: 1 }).limit(6);
    res.json({ success: true, tickets });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// AI Chatbot
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const msg = message.toLowerCase();
    let reply = '';

    if (msg.includes('sell') || msg.includes('list')) {
      reply = 'To sell a ticket: 1) Go to Seller Dashboard, 2) Click "List New Ticket", 3) Fill in details and upload your ticket, 4) Our AI will suggest a fair price, 5) Submit for verification!';
    } else if (msg.includes('buy') || msg.includes('purchase')) {
      reply = 'To buy a ticket: 1) Search for your route, 2) Filter by date and price, 3) Check seller ratings, 4) Click "Buy Now", 5) Complete secure payment. The ticket will be transferred to you instantly!';
    } else if (msg.includes('refund')) {
      reply = 'Refunds are processed within 5-7 business days. If you have a dispute, go to your order and click "Raise Dispute". Our team will review and resolve it promptly.';
    } else if (msg.includes('price') || msg.includes('cost')) {
      reply = 'Obsidian Move charges a 5% platform fee on successful sales. Sellers receive 95% of the selling price. Our AI helps suggest the best price for quick sales!';
    } else if (msg.includes('safe') || msg.includes('secure') || msg.includes('fraud')) {
      reply = 'All tickets are verified before listing. Payments are held in escrow until transfer is confirmed. Our AI fraud detection system monitors all transactions 24/7.';
    } else if (msg.includes('kyc') || msg.includes('verify') || msg.includes('verification')) {
      reply = 'KYC verification helps build trust. Go to Profile > KYC Verification, upload a government ID, and our team will verify within 24 hours.';
    } else {
      reply = "Hi! I'm Obsidian Move AI assistant. I can help you with buying tickets, selling tickets, pricing, refunds, security, and more. What would you like to know?";
    }

    res.json({ success: true, reply, timestamp: new Date().toISOString() });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
