const orderService = require('../services/orderService');
const cartService = require('../services/cartService');

exports.createOrder = async (req, res) => {
    console.log('IN create order')
  try {
    const cart = await cartService.getCart(req.user.uid);
    const orderId = await orderService.createOrder(req.user.uid, cart.items);
    await cartService.clearCart(req.user.uid);
    res.json({ success: true, orderId });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.getOrders = async (req, res) => {
  console.log('IN getOrders')
  try {
    const orders = await orderService.getUserOrders(req.user.uid);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false });
  }
};