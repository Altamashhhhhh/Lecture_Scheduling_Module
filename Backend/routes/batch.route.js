const express = require("express"); 
const batchModel = require("../models/batch.model")
const userModel = require("../models/user.model");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");

const batchRouter = express.Router();

batchRouter.post(
  "/assign",
  [authentication, authorization(["admin"])],
  async (req, res) => {
    const { instructorId, courseId, date } = req.body;

    try {
      const existingBatch = await batchModel.findOne({
        instructor: instructorId,
        date,
      });

      if (existingBatch) {
        return res
          .status(400)
          .json({ message: "Instructor already has a batch on this date." });
      }

      const newBatch = new batchModel({
        instructor: instructorId,
        course: courseId,
        date,
      });
      await newBatch.save();

      await userModel.findByIdAndUpdate(instructorId, {
        $push: { assignedBatches: newBatch._id },
      });

      res
        .status(201)
        .json({ message: "Batch assigned successfully!", batch: newBatch });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error assigning batch", error: error.message });
    }
  }
);

batchRouter.get("/", authentication, async (req, res) => {
  try {
    const batches = await batchModel
      .find()
      .populate("course instructor", "name email");
    res.status(200).json({ batches });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching batches", error: error.message });
  }
});

module.exports = batchRouter;
