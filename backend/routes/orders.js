const router = require('express').Router();
const {
	addOrder,
	getOrder,
	updateOrderToPaid,
	getLoggedInOrders,
	getAllOrders,
	updateOrderToDelivered,
} = require('../controllers/orders');
const { protect } = require('../middleware/protect');
const { isAdmin } = require('../middleware/isAdmin');

router.post('/', protect, addOrder);
router.get('/', protect, isAdmin, getAllOrders);
router.get('/myOrders', protect, getLoggedInOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/deliver', protect, isAdmin, updateOrderToDelivered);

module.exports = router;
