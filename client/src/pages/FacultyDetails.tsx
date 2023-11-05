import { useParams } from "react-router-dom";
import { useGetFacultyQuery } from "../store/API/FacultyApi";
import { iFaculty } from "../types/faculty.interface";

const FacultyDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid faculty ID</div>;
  }

  const { data: faculty, isLoading, isError } = useGetFacultyQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching faculty data.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-8 mt-6">
        Welcome to the faculty of "{faculty?.name}"
      </h2>
      <p className="text-2xl font-bold mb-8">
        This is our email email for contact: {faculty?.email}
      </p>
      <p className="text-2xl mb-6">
        Here you can see all faculties that belong to our faculty:
      </p>
      <ol>
        {faculty?.faculty?.map((item: iFaculty) => (
          <li key={item._id}>{item?.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default FacultyDetails;
