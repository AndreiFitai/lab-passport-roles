const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
  role: {
    type: String,
    enum: ["Boss", "Developer", "TA"],
    default: "Developer"
  }
});

module.exports = mongoose.model("User", userSchema);
