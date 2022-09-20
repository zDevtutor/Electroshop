const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

exports.protect = asyncHandler(async (req, res, next) => {
	let token = req.headers.authorization;

	if (!token) {
		res.status(401);
		throw new Error('Not Authorized, NO Token');
	}

	try {
		token = token.split(' ')[1];

		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

		req.user = await User.findById(decoded.id).select('-password');

		next();
	} catch (error) {
		res.status(401);
		throw new Error('Not Authorized, Token Failed');
	}
});
