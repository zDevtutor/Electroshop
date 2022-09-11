const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');

dotenv.config();

const app = express();

app.get('/products/:id', (req, res) => {
	const product = products.find(product => product._id === req.params.id);

	res.json(product);
});

app.get('/', (req, res) => {
	res.json(products);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
