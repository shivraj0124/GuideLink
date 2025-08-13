require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP Email
async function sendOtpEmail(email, otp) {
  console.log("Sending OTP email to:", email);

  const mailOptions = {
    from: `"GuideLink" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Mentor-Connect OTP',
    html: `
      <p>Hello,</p>
      <p>Your OTP for Mentor-Connect verification is:</p>
      <h2 style="color: #4CAF50;">${otp}</h2>
      <p>This OTP will expire in <strong>5 minutes</strong>.</p>
      <p>If you didn’t request this, please ignore this email.</p>
      <hr />
      <p style="font-size: 12px; color: #888;">GuideLink - Connecting Students & Mentors</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP Email sent:", info.messageId);
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = { sendOtpEmail };
