import express from "express";
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

export const universityRoutes = express.Router();

// ✅ Create 1 University
universityRoutes.post("/create", upload.single("image"), async (req, res) => {
  const { name, email, totalStudents } = req?.body;
  const { location } = req.file ? req.file : {};

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const findUniversity = await UniversityModel.findOne({ name });

    if (findUniversity) {
      return res
        .status(400)
        .json({ message: "University with the same name already exists" });
    }

    const uniqueEmail = await UniversityModel.findOne({ email });

    if (uniqueEmail) {
      return res
        .status(400)
        .json({ message: "University with the same email already exists" });
    }

    const newUniversity = new UniversityModel({ name, email, totalStudents, image: location });
    await newUniversity.save();

    res.status(201).json({ message: "University created successfully" });
  } catch (err) {
    console.error(err); // Log the specific error for debugging purposes
    res.status(500).json({ message: "Unable to create University" });
  }
});


// ✅ Get all Universities

universityRoutes.get("/get-all", async (req, res) => {
  try {
    const universities = await UniversityModel.find();
    res.status(200).json(universities);
  } catch (err) {
    res.status(500).json({ message: "unable to get all universities" });
  }
});

// ✅ Get 1 University by ID

universityRoutes.get("/get-one/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const university = await UniversityModel.findById(id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (err) {
    res.status(500).json({ message: "unable to get university by id" });
  }
});

// ✅ Delete 1 University by ID

universityRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUniversity = await UniversityModel.findByIdAndDelete(id);
    if (!deleteUniversity) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete University" });
  }
});

// ✅ Update 1 University by ID

universityRoutes.put("/update", upload.single("image"), async (req, res) => {
  const { name, email, totalStudents, universityID } = req?.body;
  const { location } = req.file ? req.file : {};
  try {
    const findUniversity = await UniversityModel.findByIdAndUpdate(
      universityID,
      { name, email, totalStudents, image: location },
    );
    if (!findUniversity) {
      return res.status(404).json({ message: "University wasnt found" });
    }
    res.status(200).json({ message: "University updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to update University" });
  }
});
