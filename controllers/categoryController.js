const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define your Destination model properties here
const Destination = sequelize.define("Destination", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Function to get all unique categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Destination.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
      ],
    });

    const categoryNames = categories.map((category) => category.category);
    res.json(categoryNames);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

module.exports = {
  getAllCategories,
};
