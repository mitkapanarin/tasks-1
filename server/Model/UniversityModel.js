import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: "",
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: "",
    trim: true,
  },
  totalStudents: {
    type: Number,
    default: 0,
    required: true,
  },
  image: {
    type: String,
    default: "",
    required: false,
  },
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: false,
    },
  ],
});

export const UniversityModel = mongoose.model("University", UniversitySchema);
