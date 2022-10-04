exports.isAdmin = (req, res, next) => {
	const isAdmin = req.user.isAdmin;

	if (!isAdmin) {
		res.status(401);
		throw new Error('User is not an admin');
	}

	next();
};
