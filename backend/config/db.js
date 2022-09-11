const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, res => {
			console.log('Database Connected'.cyan.bold.underline);
		});
	} catch (error) {
		console.log(`${error}`.red.bold);
	}
};

module.exports = connectDB;
