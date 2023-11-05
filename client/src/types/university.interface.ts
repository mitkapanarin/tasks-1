import { iFaculty } from "./faculty.interface";

export interface IUniversity {
  _id: string
  name: string;
  email: string;
  totalStudents: number;
  image: string;
  faculties: iFaculty[];
}

export interface UpdateUniversityRequest {
  name: string;
  email: string;
  totalStudents: number;
  image: string;
  _id: string;
  faculties: iFaculty[];
}


export interface EditUniversityModalProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  newUser: { [key: string]: any };
  id: string;
}