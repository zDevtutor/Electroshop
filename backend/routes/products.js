const router = require('express').Router();
const {
	getProducts,
	getProduct,
	deleteProduct,
} = require('../controllers/products');
const { isAdmin } = require('../middleware/isAdmin');
const { protect } = require('../middleware/protect');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;
