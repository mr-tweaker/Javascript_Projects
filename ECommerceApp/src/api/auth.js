const express = require('express');
const router = express.Router();
const { sendPasswordResetEmail } = require('../utils/emailService');

// In-memory user storage (replace with database in production)
const users = [];

router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, email, password });
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    req.session.userId = user.email;
    res.json({ message: 'Logged in successfully' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    const resetToken = Math.random().toString(36).substr(2, 10);
    user.resetToken = resetToken;
    sendPasswordResetEmail(email, resetToken);
    res.json({ message: 'Password reset email sent' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

router.post('/reset-password', (req, res) => {
  const { email, token, newPassword } = req.body;
  const user = users.find(u => u.email === email && u.resetToken === token);
  if (user) {
    user.password = newPassword;
    delete user.resetToken;
    res.json({ message: 'Password reset successfully' });
  } else {
    res.status(400).json({ message: 'Invalid or expired reset token' });
  }
});

module.exports = router;