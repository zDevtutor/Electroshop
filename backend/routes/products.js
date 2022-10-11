const router = require('express').Router();
const {
	getProducts,
	getProduct,
	deleteProduct,
	addProduct,
	updateProduct,
	addReview,
	getAllProducts,
} = require('../controllers/products');
const { isAdmin } = require('../middleware/isAdmin');
const { protect } = require('../middleware/protect');

router.get('/', getProducts);
router.get('/admin', protect, isAdmin, getAllProducts);
router.get('/:id', getProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);
router.post('/', protect, isAdmin, addProduct);
router.post('/:id/review', protect, addReview);
router.put('/:id', protect, isAdmin, updateProduct);

module.exports = router;
