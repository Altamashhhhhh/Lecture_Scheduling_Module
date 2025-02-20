const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "instructor"],
    default: "instructor",
    required: true,
    trim: true,
  },
  password: { type: String, required: true, trim: true },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
