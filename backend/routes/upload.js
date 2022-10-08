const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(
			null,
			new Date().toISOString().replace(/:/g, '-') +
				'-' +
				file.originalname.replace(/ /g, '-')
		);
	},
});

function fileFilter(req, file, cb) {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/png'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
}

router.post(
	'/',
	multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 5 } }).single(
		'image'
	),
	(req, res) => {
		const fileUrl = req.file.path.replace(/\\/g, '/');

		res.status(200).send(fileUrl);
	}
);

module.exports = router;
