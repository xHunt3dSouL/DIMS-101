const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destinationController");

// Route to get all destinations
router.get("/", destinationController.getAllDestinations);

// Route to get a single destination by name
router.get(
  "/:destinationName",
  destinationController.getSingleDestinationByName
);

// Route to create a new destination
router.post("/", destinationController.createDestination);

// Route to replace a destination by ID
router.put("/:destinationName", destinationController.replaceDestination);

// Route to update a destination by ID (partial update)
router.patch("/:destinationID", destinationController.updateDestination);

// Route to delete a destination by ID
router.delete("/:destinationName", destinationController.deleteDestination);

module.exports = router;
