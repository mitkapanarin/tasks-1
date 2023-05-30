import express from "express";
import { FacultyModel } from "../Model/FacultyModel.js";
import { UniversityModel } from "../Model/UniversityModel.js";

export const facultyRoutes = express.Router();

// ✅ create 1 faculty & add that under the university list

facultyRoutes.post("/create/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const findFaculty = await FacultyModel.findOne({ name });

    if (findFaculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const newFaculty = new FacultyModel({
      name,
      university: id,
      email,
    });
    await newFaculty.save();

    // Add the newly created faculty ID to the faculties list of the corresponding university
    await UniversityModel.findByIdAndUpdate(id, {
      $push: { faculties: newFaculty._id },
    });

    res.status(201).json({
      message: "Faculty created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Unable to create Faculty" });
  }
});

// ✅ get all faculties

facultyRoutes.get("/get-all", async (req, res) => {
  try {
    const faculties = await FacultyModel.find();
    res.status(200).json({ faculties });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch faculties" });
  }
});

// ✅ get all faculties of a university

facultyRoutes.get("/get-all-of-1-university/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const faculties = await FacultyModel.find({ university: id });
    res.status(200).json({ faculties });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch faculties" });
  }
});

// ✅ update 1 faculty

facultyRoutes.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedFaculty = await FacultyModel.findByIdAndUpdate(id, {
      name,
      email,
    });

    if (!updatedFaculty) {
      res.status(404).json({ message: "Faculty not found" });
      return;
    }

    res.status(200).json({
      message: "Faculty updated successfully",
      updatedFaculty,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update faculty",
    });
  }
});

// ✅ delete 1 faculty

facultyRoutes.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findFaculty = await FacultyModel.findById(id);

    if (!findFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    await FacultyModel.findByIdAndDelete(id);

    // Remove the faculty ID from the corresponding university's faculties list
    await UniversityModel.findByIdAndUpdate(findFaculty?.university, {
      $pull: { faculties: id },
    });

    res.status(200).json({
      message: "Faculty deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete faculty",
    });
  }
});
