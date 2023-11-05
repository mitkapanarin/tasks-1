import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUniversityMutation } from "../../store/API/UniversityApi";
import { IUniversity } from "../../types/university.interface";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { UpdateUniversityRequest } from "../../types/university.interface";
import InputField from "../Form/InputField";
import { toast } from "react-toastify";

interface EditUniversityModalProps {
  closeModal: () => void;
  updateUniversityData: (data: IUniversity) => void;
}

const EditUniversityModal: React.FC<EditUniversityModalProps> = ({
  closeModal,
  updateUniversityData,
}) => {
  const universityData = useSelector((state: RootState) => state);
  console.log(universityData);

  const navigate = useNavigate();
  const [university, setUniversity] = useState(universityData.university);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const [data, setData] = useState<IUniversity>(universityData);

  const [updateUniversity] =
    useUpdateUniversityMutation<UpdateUniversityRequest>();
  console.log(updateUniversity);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUniversity(data);
      toast.success("University updated successfully");
      updateUniversityData(data); // Pass updated data to the parent component
      navigate("/api/university");
    } catch (err) {
      console.log("Cannot update university", err);
      toast.error("Couldn't update university, please try again");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the selected file

    if (file) {
      setData((prevData) => ({
        ...prevData,
        image: file, // Update the image property with the selected file
      }));
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>

      {/* <!-- Main modal --> */}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          navigate("/api/university");
        }}
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed overlay top-0 left-0 right-0 z-50 ${
          !isOpen && "hidden"
        } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit university
                </h3>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <InputField
                  value={data.name}
                  onChange={handleInput}
                  label="Name of university"
                  name="name"
                  placeholder="Add new university name here"
                  type="text"
                />
                <InputField
                  value={data.email}
                  onChange={handleInput}
                  label="university email address"
                  name="email"
                  placeholder="Add new university email"
                  type="text"
                />
                <InputField
                  value={data.totalStudents?.toString() ?? ""} // Convert to string or use an empty string as the default value
                  onChange={handleInput}
                  label="Total number of students"
                  name="totalStudents"
                  placeholder="Write total number of students here"
                  type="text"
                />
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>
                <input
                  name="image"
                  type="file"
                  onChange={handleImageInputChange}
                  accept="image/*"
                />
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  data-modal-hide="defaultModal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit university
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUniversityModal;
