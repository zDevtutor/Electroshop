const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch All Products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

// @desc    Fetch Single Product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	res.json(product);
});

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product Not Found');
	}

	await product.remove();

	res.status(200).json({ message: 'Product deleted successfully' });
});
