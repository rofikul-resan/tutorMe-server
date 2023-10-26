const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
  following: {
    type: [
      {
        instructorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        instructorName: String,
      },
    ],
    default: [],
  },
  enrollCourse: {
    type: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        courseName: String,
        lastClassComplete: Number,
      },
    ],
    default: [],
  },
  notification: {
    type: [
      {
        notificationFor: {
          type: String,
        },
        updateMessage: String,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
