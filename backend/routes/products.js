const router = require('express').Router();
const {
	getProducts,
	getProduct,
	deleteProduct,
	addProduct,
	updateProduct,
} = require('../controllers/products');
const { isAdmin } = require('../middleware/isAdmin');
const { protect } = require('../middleware/protect');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.post('/', protect, isAdmin, addProduct);
router.put('/:id', protect, isAdmin, updateProduct);

module.exports = router;
