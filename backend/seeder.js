const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const users = require('./data/users');
const products = require('./data/products');

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('MongoDB Connected'.cyan.bold.underline);
	})
	.catch(err => {
		console.log(`${err}`.red.bold);
	});

const importData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		const createdUsers = await User.insertMany(users);
		const adminUser = createdUsers[0]._id;

		const sampleProducts = products.map(product => {
			return {
				...product,
				user: adminUser,
			};
		});

		await Product.insertMany(sampleProducts);

		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await User.deleteMany();
		await Product.deleteMany();
		await Order.deleteMany();

		console.log('Data Destroyed!'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
