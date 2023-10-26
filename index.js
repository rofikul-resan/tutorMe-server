const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userRoute = require("./router/userRoute");

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

const errorHandler = (err, req, res, next) => {
  if (err) {
    next(err.massage);
  }
};

app.use(errorHandler);
// port listen
app.listen(port, () => {
  console.log("server run in port", port);
});
