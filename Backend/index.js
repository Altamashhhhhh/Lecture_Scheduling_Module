require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const courseRouter = require("./routes/course.route");
const userRouter = require("./routes/user.route");
const authentication = require("./middlewares/authentication.middleware");
const batchRouter = require("./routes/batch.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/course", authentication ,  courseRouter);
app.use("/user", userRouter);
app.use("/batch" , authentication , batchRouter)

app.get("/", (req, res) => {
  res.status(200).send("WELCOME TO HOME PAGE OF LECTURE SCHEDULING APP");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("database is connected and server running on port 8080");
  } catch (error) {
    console.log("error occured while running server and database");
  }
});
