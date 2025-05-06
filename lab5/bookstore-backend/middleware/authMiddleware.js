const admin = require('firebase-admin');

exports.authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log('Token: '+token)
        
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Save user info in request
        console.log(req.user)
        next();
    } catch (error) {
        console.error("Unnauthorized");
        res.status(401).json({ message: 'Unauthorized' });
    }
};
