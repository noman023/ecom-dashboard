const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({}, { strict: false }); // Accept any fields

const Movie = mongoose.model("Movie", movieSchema, "movies");

async function register(req, res) {
  try {
    const movies = await Movie.find().limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register };
