const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const cloudinary = require('../utils/cloudinary');

// @desc    Get Products
// @route   GET /api/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
	const PAGE_SIZE = 6;
	const page = Number(req.query.pageNumber) || 1;
	const searchQuery = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...searchQuery });
	const products = await Product.find({ ...searchQuery })
		.limit(PAGE_SIZE)
		.skip(PAGE_SIZE * (page - 1));

	res.json({ products, pages: Math.ceil(count / PAGE_SIZE) });
});

// @desc    Get All Products
// @route   GET /api/products/admin
// @access  Private/Admin
exports.getAllProducts = asyncHandler(async (req, res) => {
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
	const { name, image, description, brand, price, countInStock } = req.body;

	if (!product) {
		res.status(404);
		throw new Error('Product is not found');
	}

	if (image) {
		const uploadRes = await cloudinary.uploader.upload(image, {
			upload_preset: 'electroshop',
		});

		product.image = uploadRes || {};
	}

	product.name = name || 'Sample Product';
	product.description = description || 'Product Description';
	product.brand = brand || 'Product Brand';
	product.price = price || 0;
	product.countInStock = countInStock || 0;

	const updatedProduct = await product.save();

	res.status(200).json(updatedProduct);
});

// @desc    Add Product Review
// @route   POST /api/products/:id/review
// @access  Private
exports.addReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const product = await Product.findById(req.params.id);

	if (!product) {
		res.status(404);
		throw new Error('Product is not found');
	}

	const alreadyReviewed = product.reviews.find(
		review => review.user.toString() === req.user._id.toString()
	);

	if (alreadyReviewed) {
		res.status(400);
		throw new Error('Product Already Reviewd');
	}

	const review = {
		user: req.user._id,
		name: req.user.name,
		rating: Number(rating),
		comment,
	};

	product.reviews.push(review);
	product.numReviews = product.reviews.length;
	product.rating =
		product.reviews.reduce((acc, item) => acc + item.rating, 0) /
		product.reviews.length;

	await product.save();

	res.status(201).json({ message: 'Review Added' });
});
