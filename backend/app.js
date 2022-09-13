const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

const app = express();

app.use('/api/products', productsRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(
			PORT,
			console.log(`Server Is Running On Port ${PORT}`.yellow.bold)
		);
	})
	.catch(err => {
		console.log(`${err}`.red.bold);
	});
