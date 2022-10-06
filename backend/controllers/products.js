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

// @desc    Add New Product
// @route   POST /api/products/
// @access  Private/Admin
exports.addProduct = asyncHandler(async (req, res) => {
	const product = new Product();

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product is not found');
	}

	product.name = req.body.name || 'Sample Product';
	product.image = req.body.image || '/images/sample.jpg';
	product.description = req.body.description || 'Product Description';
	product.brand = req.body.brand || 'Product Brand';
	product.price = req.body.price || 0;
	product.countInStock = req.body.countInStock || 0;

	const updatedProduct = await product.save();

	res.status(200).json(updatedProduct);
});
