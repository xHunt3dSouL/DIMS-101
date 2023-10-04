const User = require("../models/User");

const register = async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body.email);
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (req.body.password === existingUser.password) {
      res.status(200).json({ message: "Login successful", user: existingUser });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports = { register, login };
