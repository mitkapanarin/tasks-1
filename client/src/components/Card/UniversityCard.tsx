import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUniversityMutation,
  useUpdateUniversityMutation,
} from "../../store/API/UniversityApi";
import { IUniversity } from "../../types/university.interface";
import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "../Modal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GreenBadge from "../Badge/GreenBadge";

const UniversityCard = ({
  _id,
  name,
  email,
  totalStudents,
  image,
  faculties,
}: IUniversity) => {
  const [newUser, setNewUser] = useState<IUniversity>({
    _id,
    name,
    email,
    totalStudents,
    image,
    faculties,
  });

  const [updateUniversity] = useUpdateUniversityMutation();
  const [deleteUniversity] = useDeleteUniversityMutation();

  const handleDelete = async () => {
    try {
      await toast.promise(deleteUniversity({ _id }), {
        pending: "Deleting...",
        success: "University deleted successfully",
        error: "Couldn't delete, please try again 🤯",
      });
    } catch (err) {
      toast.error("Couldn't delete, please try again 🤯");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg max-h-40 w-[100%] object-cover"
        src={image}
        alt={name}
      />
      <div className="p-5 items-center justify-between">
        <GreenBadge label={totalStudents} />
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Email: {email}
        </p>
      </div>
      <div className="p-5 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/api/university/${_id}`)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            See details
            <ArrowRightIcon
              strokeWidth={3}
              className="w-4 h-4 ml-2 -mr-1"
              aria-hidden="true"
            />
          </button>
          <DeleteModal
            onClick={handleDelete}
            button={<TrashIcon className="w-6 h-6" />}
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;
