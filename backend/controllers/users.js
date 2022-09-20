const asyncHandler = require('express-async-handler');

// @desc    Get User Profile
// @route   /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
	const user = req.user;

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	res.status(200).json(user);
});
