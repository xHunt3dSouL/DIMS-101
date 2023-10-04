const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const destinationRoutes = require("./routes/destinationRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorRoutes = require("./routes/errorRoutes");
const homeRoutes = require("./routes/homeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use("/api/destinations", destinationRoutes);
app.use("/api", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use(homeRoutes);
app.use(errorRoutes);

// Database synchronization (create or update tables)
sequelize
  .sync()
  .then(() => {
    console.log("Connected to the database and synchronized.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
