const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const orderRoute = require('./routes/orders');
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoute);
app.use('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

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
