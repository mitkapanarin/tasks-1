import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: "",
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    default: "",
    minlength: 3,
    unique: true,
  },
  image: {
    type: String,
    default: "",
    required: false,
  },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
});

export const FacultyModel = mongoose.model(" Faculty", FacultySchema);
