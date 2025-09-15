require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Database connection
require("./config/dbConfig");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ecom-client-xi-seven.vercel.app",
      "https://ecom-client-noman023-mojammel-nomans-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome To ecom dashboard server!");
});

// All Routes
app.use("/api", require("./routes"));

// error handler
app.use((req, res) => {
  res.status(404).send("Route not found!");
});

module.exports = app;

// Only listen on localhost for development
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}
