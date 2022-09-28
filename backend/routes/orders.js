const router = require('express').Router();
const { addOrder } = require('../controllers/orders');
const { protect } = require('../middleware/protect');

router.post('/', protect, addOrder);

module.exports = router;
