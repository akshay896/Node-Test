const users = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register logic
exports.registerController = async (req, res) => {
  console.log("Inside registerController");
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    // Check if email already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(406).json("Account already exists! Please login.");
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Register user
    const newUser = new users({ username, email, password: hashedPassword });
    
    // Save user to MongoDB
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(401).json(err);
  }
};

// Login logic
exports.loginController = async (req, res) => {
  console.log("Inside loginController");
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json("Invalid Email / Password.");
    }
    
    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(404).json("Invalid Email / Password.");
    }
    
    // Generate JWT
    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD, { expiresIn: '1h' });
    
    res.status(200).json({
      user: existingUser,
      token
    });
  } catch (err) {
    res.status(401).json(err);
  }
};

// List users logic
exports.listUsersController = async (req, res) => {
  console.log("Inside listUsersController");

  try {
    const userList = await users.find({}, '-password'); // Exclude password field
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json(err);
  }
};
