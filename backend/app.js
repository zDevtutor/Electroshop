const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const productsRoute = require('./routes/products');
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productsRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server is running on port ${PORT} in ${process.env.NODE_DEV} mode`.yellow
			.underline.bold
	)
);
