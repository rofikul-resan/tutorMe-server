const { hash } = require("bcrypt");
const express = require("express");
const User = require("../Schema/user");

const userRoute = express.Router();

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
      res.send({
        name: result.name,
        email: result.email,
        userImage: result.userImage,
        roll: result.role,
      });
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
