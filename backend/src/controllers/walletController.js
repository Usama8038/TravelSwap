const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, balance: user.wallet.balance });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user.id);
    if (amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });
    if (user.wallet.balance < amount) return res.status(400).json({ success: false, message: 'Insufficient balance' });

    user.wallet.balance -= amount;
    await user.save();
    await Transaction.create({ user: req.user.id, type: 'withdrawal', amount, description: 'Wallet withdrawal', status: 'completed' });
    res.json({ success: true, balance: user.wallet.balance, message: 'Withdrawal initiated' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, transactions });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
