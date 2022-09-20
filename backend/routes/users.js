const router = require('express').Router();
const { getUserProfile } = require('../controllers/users');
const { protect } = require('../middleware/protect');

router.get('/profile', protect, getUserProfile);

module.exports = router;
