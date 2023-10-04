const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define your User model
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Set the default value for isAdmin to false
  },
});

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to get a single user by username
const getSingleUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: {
        username: username,
      },
      attributes: ["id", "username", "email", "isAdmin"],
    });
    res.json(user ? user : "User Not Found");
  } catch (err) {
    console.error("Error fetching user by username:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to create a user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to replace a user by username
const replaceUser = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username
    const existingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    // If the user doesn't exist, return a 404 response
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with the new data
    const updatedUser = await existingUser.update(req.body);

    // Return the updated user as the response
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error replacing user:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to update a user by ID (partial update)
const updateUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const [updatedCount] = await User.update(req.body, {
      where: {
        id: userID,
      },
    });

    if (updatedCount > 0) {
      // Fetch the updated user after the update operation
      const updatedUser = await User.findOne({
        where: {
          id: userID,
        },
        attributes: ["id", "username", "email", "isAdmin"],
      });

      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to delete a user by username
const deleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const deletedCount = await User.destroy({
      where: {
        username: username,
      },
    });

    if (deletedCount > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Exporting the updated controller functions
module.exports = {
  getAllUsers,
  getSingleUserByUsername,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
};
