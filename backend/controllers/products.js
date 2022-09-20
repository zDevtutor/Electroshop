const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch All Products
// @route   /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

// @desc    Fetch Single Product
// @route   /api/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	res.json(product);
});
