const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables from .env

const JWT_SECRET = process.env.JWT_SECRET; // Retrieve the JWT secret from environment variables

// Function to handle user registration
const register = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    // Hash the user's password with a salt of 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordCorrect) {
      // Passwords match, so generate a JSON Web Token (JWT) for the user
      const token = jwt.sign(
        { id: existingUser.id, isAdmin: existingUser.isAdmin },
        JWT_SECRET, // Use the JWT_SECRET loaded from environment variables
        {
          expiresIn: "1h",
        }
      );

      res
        .status(200)
        .json({ message: "Login successful", user: existingUser, token });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports = { register, login };
