const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
    trim: true,
  },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  batches: [{ type: String, required: true, trim: true }],
});

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
