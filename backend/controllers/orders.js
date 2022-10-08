const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Add New Order
// @route   POST /api/orders/
// @access  Private
exports.addOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(401);
		throw new Error('No Order Items');
	}

	const order = new Order({
		user: req.user._id,
		orderItems,
		shippingAddress,
		paymentMethod,
		taxPrice,
		shippingPrice,
		totalPrice,
	});

	const createdOrder = await order.save();

	res.status(201).json(createdOrder);
});

// @desc    Get Order By Id
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate('user', 'email');

	if (!order) {
		res.status(404);
		throw new Error('Order Not Found');
	}

	res.status(200).json(order);
});

// @desc    Update Order to paid
// @route   PUT /api/orders/:id
// @access  Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order Not Found');
	}

	order.isPaid = true;
	order.paidAt = Date.now();
	order.paymentResult = {
		id: req.body.id,
		status: req.body.status,
		update_time: req.body.update_time,
		email_address: req.body.email_address,
	};

	const updatedOrder = await order.save();

	res.status(200).json(updatedOrder);
});

// @desc    Update Order to delivered
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		res.status(404);
		throw new Error('Order Not Found');
	}

	order.isDelivered = true;
	order.deliveredAt = Date.now();

	const updatedOrder = await order.save();

	res.status(200).json(updatedOrder);
});

// @desc    Get Loggedin User Orders
// @route   GET /api/orders/myOrders
// @access  Private
exports.getLoggedInOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	if (!orders) {
		res.status(404);
		throw new Error('Orders Not Found');
	}

	res.status(200).json(orders);
});

// @desc    Get All Orders
// @route   GET /api/orders/
// @access  Private/Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({});

	if (!orders) {
		res.status(404);
		throw new Error('No Orders Found');
	}

	res.status(200).json(orders);
});
