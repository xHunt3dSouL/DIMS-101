const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define your Destination model
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

// Function to get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "category",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json(destinations);
  } catch (err) {
    console.error("Error fetching destinations:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to get a single destination by name
const getSingleDestinationByName = async (req, res) => {
  try {
    const { destinationName } = req.params;
    const destination = await Destination.findOne({
      where: {
        name: destinationName,
      },
    });
    res.json(destination ? destination : "Destination Not Found");
  } catch (err) {
    console.error("Error fetching destination by name:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to create a destination
const createDestination = async (req, res) => {
  console.log(req.body);
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (err) {
    console.error("Error creating destination:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to replace a destination by name
const replaceDestination = async (req, res) => {
  const { destinationName } = req.params;

  try {
    // Find the destination by name
    const existingDestination = await Destination.findOne({
      where: {
        name: destinationName,
      },
    });

    // If the destination doesn't exist, return a 404 response
    if (!existingDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Update the destination with the new data
    const updatedDestination = await existingDestination.update(req.body);

    // Return the updated destination as the response
    res.status(200).json(updatedDestination);
  } catch (err) {
    console.error("Error replacing destination:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to update a destination by ID (partial update)
const updateDestination = async (req, res) => {
  const { destinationID } = req.params;
  try {
    const [updatedCount] = await Destination.update(req.body, {
      where: {
        id: destinationID,
      },
    });

    if (updatedCount > 0) {
      // Fetch the updated destination after the update operation
      const updatedDestination = await Destination.findOne({
        where: {
          id: destinationID,
        },
      });

      res.status(200).json(updatedDestination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (err) {
    console.error("Error updating destination:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// Function to delete a destination by name
const deleteDestination = async (req, res) => {
  const { destinationName } = req.params;
  try {
    const deletedCount = await Destination.destroy({
      where: {
        name: destinationName,
      },
    });

    if (deletedCount > 0) {
      res.status(200).json({ message: "Destination deleted successfully" });
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (err) {
    console.error("Error deleting destination:", err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};
// Exporting the updated controller functions
module.exports = {
  getAllDestinations,
  getSingleDestinationByName,
  createDestination,
  replaceDestination,
  updateDestination,
  deleteDestination,
};
