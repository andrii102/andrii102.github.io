const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController')
const { authenticateUser } = require('../../middleware/authMiddleware');

router.use(authenticateUser);
router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);

module.exports = router;