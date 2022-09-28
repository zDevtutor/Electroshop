const router = require('express').Router();
const { addOrder } = require('../controllers/orders');

router.post('/', addOrder);

module.exports = router;
