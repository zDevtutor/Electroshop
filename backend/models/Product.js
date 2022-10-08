const mongoose = require('mongoose');
const reviewSchema = require('./Review');

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			default: 'Sample Product',
		},
		image: {
			type: String,
			required: true,
			default: '/uploads/sample.jpg',
		},
		description: {
			type: String,
			required: true,
			default: 'Sample Product Description',
		},
		brand: {
			type: String,
			required: true,
			default: 'Sample Product brand',
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		reviews: [reviewSchema],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Product', productSchema);
