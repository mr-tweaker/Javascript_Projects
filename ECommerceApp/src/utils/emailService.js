const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password'
  }
});

function sendPasswordResetEmail(email, token) {
  const mailOptions = {
    from: 'your-email@example.com',
    to: email,
    subject: 'Password Reset',
    text: `Use this token to reset your password: ${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = { sendPasswordResetEmail };