const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userRole: { type: String, enum: ["seller", "customer"], required: true },
  password: { type: String, required: true },
  image: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
