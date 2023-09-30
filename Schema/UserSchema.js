const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    default: "student", // Default to 'student' if no role is specified
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
          // This references the User model for instructors
        },
        updateMessage: String,
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [], // Default to an empty array
  },
});

module.exports = UserSchema;
