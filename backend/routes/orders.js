const router = require('express').Router();
const {
	addOrder,
	getOrder,
	updateOrderToPaid,
} = require('../controllers/orders');
const { protect } = require('../middleware/protect');

router.post('/', protect, addOrder);
router.get('/:id', protect, getOrder);
router.patch('/:id', protect, updateOrderToPaid);

module.exports = router;
