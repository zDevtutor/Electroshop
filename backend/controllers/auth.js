const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

// @desc    Login
// @route   /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
	let { email, password } = req.body;

	email = email.toLowerCase();

	const user = await User.findOne({ email });

	if (!user || !(await user.matchPassword(password))) {
		res.status(400);
		throw new Error('Invalid Email or Password');
	}

	res.json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		token: generateToken(user._id),
	});
});

// @desc    Register
// @route   /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
	let { name, email, password } = req.body;

	name = name.toLowerCase();
	email = email.toLowerCase();

	const isUserExist = await User.findOne({ email });

	if (isUserExist) {
		res.status(400);
		throw new Error('User Already Exist');
	}

	if (!password) {
		res.status(400);
		throw new Error('Please Enter A Password');
	}

	const user = new User({
		name,
		email,
		password,
	});

	await user.save();

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});
