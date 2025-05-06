const admin = require('../config/firebase');

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await admin.auth().getUser(req.user.uid);
        res.json({
            uid: user.uid,
            email: user.email,
            age: user.age
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.register = async (req, res) => {
    const { name, email, age } = req.body;
    const uid = req.user.uid;
  
    try {
      await admin.firestore().collection('users').doc(uid).set({ name, email, age });
      res.status(201).json({ message: 'User profile saved' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};