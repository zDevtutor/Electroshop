const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const orderRoute = require('./routes/orders');
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

const app = express();

app.use(
	express.json({
		limit: '50mb',
	})
);

app.use('/api/products', productsRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoute);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
	.connect(
		'mongodb+srv://mos123:sd2YB1hFsJQKdPnE@cluster0.xa1zvfe.mongodb.net/electroshop?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		app.listen(PORT, console.log(`Server Is Running On Port ${PORT}`));
	})
	.catch(err => {
		console.log(`${err}`);
	});
