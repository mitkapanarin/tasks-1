import React, { FC } from "react";
import { XMarkIcon  } from "@heroicons/react/24/outline";

interface IDeleteModalProps {
  button: React.ReactNode;
  onClick: () => Promise<void>;
}

const DeleteModal: FC<IDeleteModalProps> = ({ button, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        {button}
      </button>

      <div
        id="popup-modal"
        tabIndex={-1}
        className={`${
          !isOpen && "hidden"
        } bg-black bg-opacity-80 fixed flex justify-center items-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon
                className="w-5 h-5"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            </button>
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={() => {
                  onClick();
                  setIsOpen(false);
                }}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;