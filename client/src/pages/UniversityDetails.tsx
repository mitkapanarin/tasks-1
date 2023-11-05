import { useParams } from "react-router-dom";
import { useGetUniversityQuery } from "../store/store";
import { nanoid } from "@reduxjs/toolkit";
import { iFaculty } from "../types/faculty.interface";
import FacultyCard from "../components/Card/FacultyCard";
import {useGetAllFacultiesQuery} from "../store/API/FacultyApi"

const UniversityDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid university ID</div>;
  }

  const { data: university, isLoading, isError } = useGetUniversityQuery(id);
  console.log(university);

  const getAllFaculties  = useGetAllFacultiesQuery(id);
  console.log(university);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching university data.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8 mt-6">Welcome to university of "{ university?.name }" </h2>
      <p className="text-2xl font-bold mb-8 "> This is our email adress for contact: {university?.email}</p>
      <p className="text-2xl mb-6 ">Here you can see all facultiies that belongs to our university</p>
      <ol>
        {university?.faculties?.map((item) => (
          <li key={nanoid()}>
              <FacultyCard key={item?._id} {...item} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UniversityDetails;