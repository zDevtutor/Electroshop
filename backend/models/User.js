const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			maxlength: [50, 'Name can not be more than 50 characters'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minLength: 6,
		},
		isAdmin: {
			type: String,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
