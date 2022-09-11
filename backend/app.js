const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const products = require('./data/products');

dotenv.config();

connectDB();

const app = express();

app.get('/api/products/:id', (req, res) => {
	const product = products.find(product => product._id === req.params.id);

	res.json(product);
});

app.get('/api/products', (req, res) => {
	res.json(products);
});

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server is running on port ${PORT} and in ${process.env.NODE_DEV} mode`
			.yellow.underline.bold
	)
);
