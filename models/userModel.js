const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true },
  likedMovies: { type: Array },
  DislikedMovies: { type: Array },
  ListMovies: { type: Array },
});

module.exports = mongoose.model("users", userSchema);
