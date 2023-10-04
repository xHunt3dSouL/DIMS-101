const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Route to get all categories
router.get("/category", categoryController.getAllCategories);

module.exports = router;
