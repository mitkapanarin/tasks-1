import express from "express";
import { FacultyModel } from "../Model/FacultyModel.js";
import { UniversityModel } from "../Model/UniversityModel.js";
import dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();

const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      const fileName = `${Date.now().toString()}_${file.originalname}`
      cb(null, fileName)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  })
})

export const facultyRoutes = express.Router();

// ✅ create 1 faculty & add that under the university list

facultyRoutes.post("/create/:id", upload.single("image"), async (req, res) => {
  const { name, email } = req?.body;
  const { location } = req?.file;
  try {
    const findFaculty = await FacultyModel.findOne({ name });

    if (findFaculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    const newFaculty = new FacultyModel({
      name,
      university: id,
      email,
      image: location 
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


// ✅ get one faculty of a university
facultyRoutes.get("/get-one-faculty/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await FacultyModel.findById(id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({ faculty });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch faculty" });
  }
});


// ✅ update 1 faculty

facultyRoutes.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req?.params;
    const { name, email } = req?.body;
  const { location } = req?.file;

    const updatedFaculty = await FacultyModel.findByIdAndUpdate(id, {
      name,
      email,
      image: location 
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
