import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_KEY, NODE_ENV, CLIENT_URL } from '../../config.js';
import { sendWelcomeEmail } from '../emails/emailHandlers.js';

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if(!name || !username || !password || !email){
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email: {$regex: `^${email}$`, $options: 'i'} });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username: {$regex: `^${username}$`, $options: 'i'} });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if(password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user =new User({ name, username, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_KEY, { expiresIn: '3d' });

    res.cookie('jwt-linkedin', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'strict', //prevent CSRF attacks,
      secure: NODE_ENV === 'production', //prevrent main-in-the-middle attacks
    })

    res.status(201).json({ message: 'User registered successfully'});

    const profileUrl = `${CLIENT_URL}/profile/${user.username}`;

    //todo: send welcome email
    try {
      await sendWelcomeEmail(user.email, user.name, profileUrl);
    } catch (error) {
      console.error(`Error sending welcome email to ${user.email}`, error.message);
    }
  } catch (error) {
    console.error('Error in signup', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: {$regex: `^${username}$`, $options: 'i'} });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_KEY, { expiresIn: '3d' });

    res.cookie('jwt-linkedin', token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
      secure: NODE_ENV === 'production',
    });

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error in login', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const logout = async (req, res) => {
  res.clearCookie('jwt-linkedin');
  res.status(200).json({ message: 'User logged out successfully' });
}

export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}