import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditFacultyMutation } from "../../store/API/FacultyApi";
import { iFaculty, editFacultyRequest } from "../../types/faculty.interface";
import DeleteIcon from "../DeleteModal/DeleteFacultyModal";
import EditFacultyModal from "../EditModal/EditFacultyModal";

const FacultyCard = ({ _id, name, email, image }: iFaculty) => {
  // const [deleteUniversity, { isLoading }] = useDeleteUniversityMutation();
  const [editFaculty] = useEditFacultyMutation<editFacultyRequest>();

  const [newUser, setNewUser] = useState<iFaculty>({
    name: name,
    email: email,
    image: image,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editFaculty({
        body: newUser,
        id: _id,
      });
      console.log("faculty updated successfully");
    } catch (error) {
      console.error("Failed to update faculty", error);
    }
  };

  const navigate = useNavigate();

  // const deleteCard = async () => {
  //   try {
  //     await deleteUniversity(_id);
  //     console.log("University deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete university", error);
  //   }
  // };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={image} alt={name} />
      </a>
      <div className="p-5 items-center justify-between space-x-2">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{email}</p>
        </div>
      <div className="p-5 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/api/faculty/get-one-faculty/${_id}`)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            See details
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {/* <button  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={deleteCard}>Delete</button> */}
          <DeleteIcon _id={_id} />
          <EditFacultyModal handleChange={handleChange} handleSubmit={handleSubmit} newUser={newUser} id={_id}/>
        </div>
      </div>
    </div>
  );
};

export default FacultyCard;
