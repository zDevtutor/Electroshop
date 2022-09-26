const router = require('express').Router();
const { getUserProfile, updateUserProfile } = require('../controllers/users');
const { protect } = require('../middleware/protect');

router.get('/:id', protect, getUserProfile);
router.put('/:id', protect, updateUserProfile);

module.exports = router;
