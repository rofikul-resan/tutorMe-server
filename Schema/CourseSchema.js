const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
  instructor: {
    id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    name: String,
  },

  class: {
    type: [
      {
        title: String,
        classVideoLink: String,
      },
    ],
    default: [],
  },
  enrolledStudent: {
    type: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        studentName: String,
      },
    ],
    default: [],
  },
});

const Course = mongoose.model();
module.exports = Course;
