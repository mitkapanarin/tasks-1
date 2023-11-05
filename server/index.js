import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { facultyRoutes } from './Routes/FacultyRoutes.js';
import { universityRoutes } from './Routes/UniversityRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/faculty', facultyRoutes);
app.use('/api/university', universityRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

