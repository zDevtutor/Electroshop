const router = require('express').Router();
const {
	getUserProfile,
	updateUserProfile,
	getAllUsers,
} = require('../controllers/users');
const { isAdmin } = require('../middleware/isAdmin');
const { protect } = require('../middleware/protect');

router.get('/', protect, isAdmin, getAllUsers);
router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);

module.exports = router;
