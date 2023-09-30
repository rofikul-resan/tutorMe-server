const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const UserSchema = require("./Schema/UserSchema");
const CourseSchema = require("./Schema/CourseSchema");
const { hash } = require("bcrypt");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TutorMe server is running ");
});

//----------------------------
//       database work
//----------------------------
const dbUri = process.env.DB_URL;

async function runDb() {
  const userModel = mongoose.model("User", UserSchema);
  const courseModel = mongoose.model("Course", CourseSchema);
  try {
    await mongoose.connect(`${dbUri}/tutor-Me`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("after db connect");

    //-----------------------
    //     user route
    //----------------------
    app.post("/user/singUp", async (req, res) => {
      const newUserData = req.body;
      const userPass = newUserData.password;
      const hashPass = await hash(userPass, 2);
      newUserData.password = hashPass;
      const newUser = new userModel(newUserData);
      const result = await newUser.save();
      delete result.password;
      res.send(result);
    });
  } finally {
  }
}
runDb().catch((err) => console.log("error from log", err));

const errorHandler = (err, req, res, next) => {
  next(err.massage);
};

app.use(errorHandler);
// port listen
app.listen(port, () => {
  console.log("server run in port", port);
});
