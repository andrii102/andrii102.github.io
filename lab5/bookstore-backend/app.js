const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const bookRoutes = require('./routes/api/books');
const authRoutes = require('./routes/api/auth');
const cartRoutes = require('./routes/api/cart');
const orderRoutes = require('./routes/api/order');

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

module.exports = app;
