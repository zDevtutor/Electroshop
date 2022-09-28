const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Fetch Single Product
// @route   /api/products/:id
// @access  Public
exports.addOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems === 0) {
		res.status(401);
		throw new Error('No Order Items');
	} else {
		const order = new Order({
			orderItems,
			shippingAddress,
			paymentMethod,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});
