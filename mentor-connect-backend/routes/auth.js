// routes/auth.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { sendOtpEmail } = require('../utils/mailUtils');
const jwt = require("jsonwebtoken");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Send OTP
router.post('/send-otp', async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  const { email } = req.body;

  // Check if email already exists
  const { data: existingUsers, error: userCheckError } = await supabase
    .from('users')
    .select('email')
    .eq('email', email);

  if (userCheckError) {
    console.error(userCheckError);
    return res.send({ status: 500, message: 'Internal server error while checking email' });
  }

  if (existingUsers.length > 0) {
    return res.send({ status: 500, message: 'Email already exists' });
  }

  // Remove old OTP if exists
  await supabase.from('email_otp').delete().eq('email', email);

  // Insert new OTP
  const { error: insertError } = await supabase
    .from('email_otp')
    .insert([{ email, otp, expires_at: expiresAt }]);

  if (insertError) {
    console.error(insertError);
    return res.send({ status: 500, message: 'Failed to store OTP' });
  }

  try {
    await sendOtpEmail(email, otp); // Call from mailService
    return res.send({ status: 200, message: 'OTP sent successfully' });
  } catch (mailErr) {
    return res.send({ status: 500, message: 'Failed to send OTP email' });
  }
});


router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  console.log("OTP data:", otp);
  const { data, error } = await supabase
  .from('email_otp')
  .select('*')
  .eq('email', email.trim().toLowerCase())
  .eq('otp', otp.trim());

  if (error || !data || data.length == 0) return res.send({status:200 ,message: 'Invalid OTP' });
  
  console.log("OTP data:", new Date(data.expires_at) < new Date());
  if (new Date(data.expires_at) < new Date()) {
    return res.send({ status:202,message: 'OTP expired' });
  }

  // Delete OTP entry
  await supabase.from('email_otp').delete().eq('email', email);

  res.send({status:200, message: 'OTP verified successfully' });
});

router.post('/create-user', async (req, res) => {
  try {
    const { email, username, password, role,skills } = req.body;

    console.log("Checking if user already exists...");

    // Check if email already exists
    const { data: existingEmail, error: emailError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (emailError) throw emailError;
    if (existingEmail) {
      return res.send({ status: 409, message: 'Email already registered' });
    }

    // Check if username already exists
    const { data: existingUsername, error: usernameError } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (usernameError) throw usernameError;
    if (existingUsername) {
      return res.send({ status: 409, message: 'Username already taken' });
    }

    console.log("Inserting new user...");

    // Insert into custom "users" table
    const { error: dbError } = await supabase.from('users').insert([
      {
        email,
        username,
        role,
        password, // ⚠️ Store hashed password in production
        skills
      },
    ]);

    if (dbError) {
      console.error("DB error:", dbError.message);
      return res.send({ status: 500, message: dbError.message });
    }

    return res.send({ status: 200, message: 'User created successfully' });

  } catch (err) {
    console.error("Unexpected error:", err);
    return res.send({ status: 500, message: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
   
    const { data: userRow, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !userRow) {
      return res.send({ status: 403, message: "User not found" });
    }

    if (userRow.password !== password) {
      return res.send({ status: 403, message: "Invalid credentials" });
    }

    console.log("Logging in user:", email);
    // Create JWT token
    const token = jwt.sign(
      { id: userRow.id, email: userRow.email, role: userRow.role },
      process.env.JWT_SECRET, // Keep this in .env
      { expiresIn: "20d" } // Token expires in 1 hour
    );
    return res.send({
      status: 200,
      message: "Login successful",
      token, // Send token to frontend
      user: {
        id: userRow.id,
        email: userRow.email,
        username: userRow.username,
        role: userRow.role
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.send({ status: 500, message: "Server error during login" });
  }
});

router.get("/get_skills", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("skills_master")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) throw error;
    console.log("Fetched skills:", data);
    res.send({ status:200,skills: data });
  } catch (err) {
    console.error("Error fetching skills:", err.message);
    res.send({status:500, error: "Failed to fetch skills" });
  }
});

module.exports = router;

