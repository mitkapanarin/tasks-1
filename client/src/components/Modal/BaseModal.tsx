import React, { FC, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IBaseModalProps {
  title: string;
  button: React.ReactNode;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const BaseModal: FC<IBaseModalProps> = ({
  title,
  button,
  children,
  onSubmit,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        data-modal-target="defaultModal"
        data-modal-toggle="defaultModal"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {button}
      </button>

      {/* <!-- Main modal --> */}
      <form
        onSubmit={(e) => {
          onSubmit(e);
          setShowModal(false);
        }}
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          !showModal && "hidden"
        } flex justify-center items-center fixed z-50 bg-black bg-opacity-80 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <XMarkIcon
                  onClick={() => setShowModal(false)}
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  aria-hidden={true}
                />
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">{children}</div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                I accept
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => setShowModal(false)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BaseModal;
