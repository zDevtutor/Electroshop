const router = require('express').Router();
const { addOrder, getOrder } = require('../controllers/orders');
const { protect } = require('../middleware/protect');

router.post('/', protect, addOrder);
router.get('/:id', protect, getOrder);

module.exports = router;
