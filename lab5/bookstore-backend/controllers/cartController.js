const cartService = require('../services/cartService');

exports.getCart = async (req, res) => {
    console.log('In getCart')
    try {
        if (!req.user || !req.user.uid) {
          return res.status(401).json({ message: 'User not authenticated' });
        }
    
        const cart = await cartService.getCart(req.user.uid)
        res.status(200).json(cart);
      } catch (error) {
        console.error('Error in getCart:', error);
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
      }
};

exports.addToCart = async (req, res) => {
    try {
      if (!req.user?.uid) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      
      // Validate and extract data
      const { book, quantity = 1 } = req.body;
      if (!book || !book.id) {
        return res.status(400).json({ message: 'Invalid book data' });
      }
  
      // Call service
      const updatedCart = await cartService.addToCart(req.user.uid, { book, quantity });
      
      // Return success
      res.json(updatedCart);
      
    } catch (error) {
      console.error('Error in addToCart controller:', error);
      res.status(500).json({ 
        message: error.message || 'Failed to add to cart' 
      });
    }
};


exports.updateQuantity = async (req, res) => {
    try {
        if (!req.user?.uid) {
            return res.status(401).json({ message: 'User not authenticated' });
            }
  
      const { bookId, newQuantity } = req.body;
      
      // Additional validation
      if (newQuantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
      }
  
      const updatedCart = await cartService.updateQuantity(
        req.user.uid, 
        { bookId, newQuantity }
      );
      
      res.json(updatedCart);
  
    } catch (error) {
      console.error('Error in updateQuantity controller:', error);
      const status = error.message === 'Cart not found' ? 404 : 500;
      res.status(status).json({ 
        message: error.message || 'Failed to update quantity' 
      });
    }
  };

  exports.removeFromCart = async (req, res) => {
    try {
      if (!req.user?.uid) {
        return res.status(401).json({ message: 'Authentication required' });
      }
  
      const { bookId } = req.params;
      
      if (!bookId) {
        return res.status(400).json({ message: 'Book ID is required' });
      }
  
      const updatedCart = await cartService.removeFromCart(req.user.uid, bookId);
      
      res.json(updatedCart);
  
    } catch (error) {
      console.error('Error in removeFromCart controller:', error);
      const status = error.message === 'Cart not found' ? 404 : 500;
      res.status(status).json({ 
        message: error.message || 'Failed to remove item from cart' 
      });
    }
  };


  exports.clearCart = async (req, res) => {
    try {
      if (!req.user?.uid) {
        return res.status(401).json({ message: 'Authentication required' });
      }
  
      console.log(`Clearing cart for user ${req.user.uid}`);
      const result = await cartService.clearCart(req.user.uid);
      
      res.json({
        success: true,
        message: 'Cart cleared successfully',
        cart: result
      });
  
    } catch (error) {
      console.error('Clear cart error:', error);
      const status = error.message === 'Cart not found' ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message || 'Failed to clear cart'
      });
    }
  };