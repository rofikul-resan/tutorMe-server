const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const UserSchema = require("./Schema/UserSchema");

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TutorMe server is running ");
});
const dbUri = process.env.DB_URL;
// const dbUri = "mongodb://localhost:27017";

const userModel = mongoose.model("User", UserSchema);

async function runDb() {
  await mongoose.connect(`${dbUri}/tutor-Me`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("db connect successful");
}
runDb().catch((err) => console.log("error from log", err));

app.listen(port, () => {
  console.log("server run in port", port);
});
