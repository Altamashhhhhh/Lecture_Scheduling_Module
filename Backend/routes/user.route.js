const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const authentication = require("../middlewares/authentication.middleware");
const authorization = require("../middlewares/authorization.middleware");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new userModel({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful! You can now log in.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, // password is excluded for security reasons
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while processing your registration. Please try again later.",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(403)
        .json({ message: "Wrong password", success: false });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({
        message: "Login Successfull",
        success: true,
        token,
        user: { name: user.name, role: user.role, email: user.email },
      });
  } catch (error) {
    res.status(500).json({
      message: "An error occured while login. Please try again later.",
      error: error.message,
      success: false,
    });
  }
});

userRouter.get(
  "/instructors",
  [authentication, authorization(["admin"])],
  async (req, res) => {
    try {
      const instructors = await userModel.find({ role: "instructor" });
      res.status(200).json({ instructors });
    } catch (error) {
      res.status(500).json({
        message:
          "An error occured while fetching all instructors , Please try again later.",
        success: false,
        error: error.message,
      });
    }
  }
);

userRouter.get(
  "/users",
  [authentication, authorization(["admin"])],
  async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({
        message:
          "An error occured while fetching all users , Please try again later.",
        success: false,
        error: error.message,
      });
    }
  }
);

userRouter.patch(
  "/update-user/:id",
  [authentication, authorization(["admin"])],
  async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({
          message: "User not found, Please check the ID and try again ",
          success: false,
        });
      }
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return req.status(500).json({
        message:
          "An error occurred while updating the user. Please try again later.",
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = userRouter;
