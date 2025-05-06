const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');
const { authenticateUser } = require('../../middleware/authMiddleware');

// Get user's cart
router.get('/', authenticateUser, cartController.getCart);

// Add a book to cart
router.post('/add', authenticateUser, cartController.addToCart);

router.put('/update-quantity', authenticateUser,cartController.updateQuantity);

router.delete('/remove/:bookId', authenticateUser, cartController.removeFromCart);

router.delete('/clear', authenticateUser, cartController.clearCart);

module.exports = router;
