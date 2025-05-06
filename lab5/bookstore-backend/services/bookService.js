const { firestore } = require('../config/firebase');

exports.getAllBooks = async () => {
    const snapshot = await firestore.collection("books").get();
    const books = [];
    snapshot.forEach(doc => {
      books.push({ id: doc.id, ...doc.data() });
    });
    return books;
};

exports.getBookById = async (id) => {
  const snapshot = await firestore.collection('books').where('id', '==', Number(id)).get();
  if (snapshot.empty) throw new Error('Book not found');
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};