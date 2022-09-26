const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

// @desc    Get User Profile
// @route   /api/users/:id
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = req.user;

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	res.status(200).json(user);
});

// @desc    Update User Profile
// @route   /api/users/:id
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
	let { name, email, password } = req.body;

	name = name.toLowerCase();
	email = email.toLowerCase();

	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const isExist = await User.findOne({ email });

	if (isExist && isExist.email !== user.email) {
		res.status(401);
		throw new Error('Email Already Exist');
	}

	user.name = name || user.name;
	user.email = email || user.email;

	if (password && password !== '') {
		user.password = password;
	}

	const updatedUser = await user.save();

	res.status(200).json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		isAdmin: updatedUser.isAdmin,
		token: generateToken(user._id),
	});
});
