const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    maxlength: 6,
  },
  expire: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
