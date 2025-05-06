const { firestore } = require('../config/firebase');

exports.createOrder = async (userId, items) => {
  const orderRef = firestore.collection('orders').doc();
  const total = items.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  
  await orderRef.set({
    userId,
    items,
    total,
    status: 'completed',
    date: new Date().toISOString()
  });
  
  return orderRef.id;
};

exports.getUserOrders = async (userId) => {
  const snapshot = await firestore.collection('orders')
    .where('userId', '==', userId)
    .get();
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};