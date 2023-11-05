import React, { useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEditFacultyMutation } from '../../store/API/FacultyApi';
// import { updatefacultyStateData } from '../store/Slices/facultySlice';
import { iFaculty, editFacultyRequest } from "../../types/faculty.interface";
import { RootState } from '../../store/store';
import { toast } from 'react-toastify';


const EditFacultyModal = () => {
  const facultyData = useSelector((x: RootState) => x);
  console.log(facultyData);

  const universityOwner = useSelector((x: RootState) => x.id);
  console.log(universityOwner);

  const [data, setData] = useState<iFaculty>(facultyData);

  const [editFaculty] = useEditFacultyMutation();

  // const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editFaculty(data)
    //   dispatch(updateFacultyStateData(data))
      toast.success('faculty updated successfully');
    } catch (err) {
      console.log('cannot update faculty', err);
      toast.error("Couldn't update, please try again");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </button>

      {/* <!-- Main modal --> */}
      <form onSubmit={handleSubmit} id="defaultModal" tabIndex="-1" aria-hidden="true" className={`fixed overlay top-0 left-0 right-0 z-50 ${!isOpen && 'hidden'} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit faculty
                </h3>
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter your new name
                </label>
                <input
                  onChange={onChange}
                  value={data.name}
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Enter your new email 
                </label>
                <input
                  onChange={onChange}
                  value={data.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="aaa@company.com"
                  required
                />
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={() => setIsOpen(!isOpen)} data-modal-hide="defaultModal"
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit faculty
                </button>
                <button onClick={() => setIsOpen(!isOpen)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditFacultyModal


