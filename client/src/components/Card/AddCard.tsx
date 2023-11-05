import { PlusIcon } from "@heroicons/react/24/outline";
const AddCard = () => {
  return (
    <div
      style={{
        height: "100%",
      }}
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center justify-center"
    >
      <PlusIcon className="h-20 w-20 text-gray-400" />
      <h5 className="mt-4 text-gray-300">Add University</h5>
    </div>
  );
};

export default AddCard;
