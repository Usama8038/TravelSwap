const router = require('express').Router();
const { getBalance, withdraw, getTransactions } = require('../controllers/walletController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/balance', getBalance);
router.post('/withdraw', withdraw);
router.get('/transactions', getTransactions);

module.exports = router;
