const { firestore } = require('../config/firebase');

// Get user's cart
exports.getCart = async (userId) => {
  const cartRef = firestore.collection('cart').doc(userId);
  const cartSnap = await cartRef.get();

  if (!cartSnap.exists) {
    return {items: [], userId };
  }

  return cartSnap.data();
};


exports.addToCart = async (userId, { book, quantity = 1 }) => {
  try {
    if (!book || !book.id) {
      throw new Error('Invalid book data');
    }

    const cartRef = firestore.collection('cart').doc(userId);
    const cartDoc = await cartRef.get();

    const newItem = { book, quantity };

    if (!cartDoc.exists) {
      await cartRef.set({
        items: [newItem],
        userId
      });
    } else {
      const cartData = cartDoc.data();
      const existingItemIndex = cartData.items.findIndex(
        item => item.book.id === book.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...cartData.items];
        updatedItems[existingItemIndex].quantity += quantity;
        await cartRef.update({ items: updatedItems });
      } else {
        // Add new item
        await cartRef.update({
          items: [...cartData.items, newItem]
        });
      }
    }

    // Return updated cart
    const updatedCart = await cartRef.get();
    return updatedCart.data();
    
  } catch (error) {
    console.error('Error in cart service:', error);
    throw error; // Re-throw for controller to handle
  }
};

exports.updateQuantity = async (userId, { bookId, newQuantity }) => {
  try {
    // Validate input
    if (!bookId || newQuantity === undefined || newQuantity < 1) {
      throw new Error('Invalid quantity update data');
    }

    const cartRef = firestore.collection('cart').doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      throw new Error('Cart not found');
    }

    // Update the specific item's quantity
    const updatedItems = cartDoc.data().items.map(item => 
      item.book.id === bookId ? { ...item, quantity: newQuantity } : item
    );

    await cartRef.update({ items: updatedItems });
    
    // Return the updated cart
    return (await cartRef.get()).data();

  } catch (error) {
    console.error('Error in updateQuantity service:', error);
    throw error;
  }
};


exports.removeFromCart = async (userId, bookId) => {
  try {
    const bookIdNum = Number(bookId);
    if (isNaN(bookIdNum)) {
      throw new Error('Invalid book ID');
    }

    const cartRef = firestore.collection('cart').doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      throw new Error('Cart not found');
    }

    const currentItems = cartDoc.data().items || [];

    console.log('BookId:', bookId)
    // Filter out the item to remove
    const updatedItems = currentItems.filter(item => 
      Number(item.book.id) !== bookIdNum
    );

    console.log('UpdatedItems: ',updatedItems)
    await cartRef.update({ items: updatedItems });
    
    // Return the updated cart
    return (await cartRef.get()).data();

  } catch (error) {
    console.error('Error in removeFromCart service:', error);
    throw error;
  }
};


exports.clearCart = async (userId) => {
  try {
    const cartRef = firestore.collection('cart').doc(userId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      throw new Error('Cart not found');
    }

    // Empty the items array (keeps document)
    await cartRef.update({ 
      items: [],
      userId: userId
    });

    return { items: [], userId };

  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};