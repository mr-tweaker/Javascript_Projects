require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const path = require('path');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using https in production
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Temporary route for products (to be replaced with database-driven route)
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 24.99 },
    { id: 3, name: 'Product 3', price: 29.99 },
    { id: 4, name: 'Product 4', price: 34.99 },
  ]);
});

// Serve index.html for all other routes (for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Add this route before your catch-all route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Your existing catch-all route should remain at the bottom
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});