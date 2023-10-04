const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("Page Not Found");
});
module.exports = router;
