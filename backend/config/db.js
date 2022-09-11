const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, () => {
			console.log('Database Connected'.cyan.bold.underline);
		});
	} catch (err) {
		console.log(`${err}`.red.bold);
	}
};

module.exports = connectDB;
