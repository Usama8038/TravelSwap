const router = require('express').Router();
const { createOrder, getMyPurchases, getMySales, confirmOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/my-purchases', protect, getMyPurchases);
router.get('/my-sales', protect, getMySales);
router.post('/:id/confirm', protect, confirmOrder);

module.exports = router;
