const router = require('express').Router();
const { suggestPrice, checkFraud, getDemand, getUrgentDeals, chat } = require('../controllers/aiController');

router.post('/price-suggest', suggestPrice);
router.post('/fraud-check', checkFraud);
router.get('/demand/:route', getDemand);
router.get('/urgent-deals', getUrgentDeals);
router.post('/chat', chat);

module.exports = router;
