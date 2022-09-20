const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

// @desc    Login
// @route   /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		res.status(400);
		throw new Error('Email is not valid');
	}

	if (!(await user.matchPassword(password))) {
		res.status(400);
		throw new Error('password is invalid');
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
	const { name, email, password } = req.body;

	const isUserExist = await User.findOne({ email });

	if (isUserExist) {
		res.status(400);
		throw new Error('User Already Exist');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = new User({
		name,
		email,
		password: hashedPassword,
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
		throw new Error('User No Found');
	}
});
