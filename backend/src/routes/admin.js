const router = require('express').Router();
const { getStats, getUsers, getAllTickets, approveTicket, getDisputes, resolveDispute, getRevenue } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));
router.get('/stats', getStats);
router.get('/users', getUsers);
router.get('/tickets', getAllTickets);
router.put('/tickets/:id/approve', approveTicket);
router.get('/disputes', getDisputes);
router.put('/disputes/:id', resolveDispute);
router.get('/revenue', getRevenue);

module.exports = router;
