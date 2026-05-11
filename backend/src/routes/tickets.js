const router = require('express').Router();
const { getTickets, getTicket, createTicket, updateTicket, deleteTicket, getMyListings } = require('../controllers/ticketController');
const { protect } = require('../middleware/auth');

router.get('/', getTickets);
router.get('/my-listings', protect, getMyListings);
router.get('/:id', getTicket);
router.post('/', protect, createTicket);
router.put('/:id', protect, updateTicket);
router.delete('/:id', protect, deleteTicket);

module.exports = router;
