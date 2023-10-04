const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);

router.get("/:userID", userController.getSingleUserByUsername);

router.post("/", userController.createUser);

router.patch("/:userID", userController.updateUser);

router.delete("/:username", userController.deleteUser);

module.exports = router;
