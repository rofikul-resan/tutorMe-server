const { hash, compare } = require("bcrypt");
const express = require("express");
const User = require("../Schema/user");

const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email }).select({
      password: 0,
    });
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

userRoute.post("/login", async (req, res) => {
  const user = req.body;
  try {
    const exitUser = await User.findOne({ email: user.email });
    if (exitUser) {
      const verifyPass = await compare(user.password, exitUser.password);
      console.log(verifyPass);
      if (verifyPass) {
        delete exitUser.password;
        const result = await User.findOne({ email: user.email }).select({
          password: 0,
        });
        res.json(result);
      } else {
        res.status(404).send({
          error: {
            message: "Invalid User Email or password",
          },
        });
      }
    } else {
      res.status(404).send({
        error: {
          message: "Invalid User Email or password",
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

userRoute.post("/singUp", async (req, res) => {
  const newUserData = req.body;
  try {
    const isExitUser = await User.findOne({ email: newUserData.email });
    console.log(isExitUser);
    if (!isExitUser) {
      const userPass = newUserData.password;
      const hashPass = await hash(userPass, 2);
      newUserData.password = hashPass;
      const newUser = new User(newUserData);
      const result = await newUser.save();
      const user = await User.findOne({ email: result.email }).select({
        password: 0,
      });
      res.json(user);
    } else {
      res.status(403).send({
        error: {
          message: "Already user exit in this email",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = userRoute;
