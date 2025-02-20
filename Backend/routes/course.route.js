const express = require("express");
const courseRouter = express.Router();
const courseModel = require("../models/course.model");
const authorization = require("../middlewares/authorization.middleware");

courseRouter.post(
  "/create-course",
  authorization(["admin"]),
  async (req, res) => {
    const { name, level, image, description, batches } = req.body;
    try {
      const course = new courseModel({
        name,
        level,
        image,
        description,
        batches: batches.split(","),
      });
      await course.save();
      res.status(201).json({ message: "Course Created Successful", course });
    } catch (error) {
      return res.status(500).json({
        message: "An error occured while creating new course",
        error: error.message,
      });
    }
  }
);

courseRouter.get("/courses", authorization(["admin"]), async (req, res) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json({ message: "Courses Fetched Successful", courses });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured while fetch courses",
      error: error.message,
    });
  }
});

module.exports = courseRouter;
