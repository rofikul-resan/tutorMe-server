const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./router/userRoute");
const router = require("express").Router();
const serverLess = require("serverless-http");

//middleware
app.use(cors());
app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("TutorMe server is running ");
});

//----------------------------
//       database work
//----------------------------
const dbUri = process.env.DB_URL;

async function runDb() {
  try {
    await mongoose.connect(`${dbUri}/tutor-Me`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("after db connect");
  } catch (err) {
    console.log(err.massage);
  }
}
runDb().catch((err) => console.log("error from log", err));

app.use("/user", userRoute);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});
// port listen
app.listen(port, () => {
  console.log("server run in port", port);
});
const handler = serverless(app);
module.exports = handler;
