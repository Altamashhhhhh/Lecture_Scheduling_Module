const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: { type: Date, required: true },
});

batchSchema.index({ instructor: 1, date: 1 }, { unique: true });

const batchModel = mongoose.model("batch", batchSchema);
module.exports = batchModel;
