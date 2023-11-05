import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  RootState,
  useCreateUniversityMutation,
  useGetAllUniversitiesQuery,
} from "../store/store";
import { IUniversity } from "../types/university.interface";
import UniversityCard from "../components/Card/UniversityCard";
import AddCard from "../components/Card/AddCard";
import BaseModal from "../components/Modal/BaseModal";
import InputField from "../components/Form/InputField";
import { toast } from "react-toastify";

const Universities = () => {
  const state = useSelector((x: RootState) => x);
  const [newUniversity, setNewUniversity] = useState<
    Omit<IUniversity, "faculties" | "_id">
  >({
    name: "",
    email: "",
    image: "",
    totalStudents: 0,
  });
  const { data } = useGetAllUniversitiesQuery(undefined);
  const [createUniversity] = useCreateUniversityMutation();
  console.log(newUniversity);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewUniversity({ ...newUniversity, [e.target.name]: e.target.value });

  const handleFileChange = (e: any) => {
    // const file = e.target.files?.[0];
    console.log(e.target.files)
    // if (file) {
    //   setNewUniversity((prevUniversity) => ({
    //     ...prevUniversity,
    //     [e.target.name]: file,
    //   }));
    // }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    try {
      await toast.promise(createUniversity(newUniversity), {
        pending: "Adding...",
        success: "University added successfully",
        error: "Couldn't add, please try again 🤯",
      });
    } catch (err) {
      console.log("error occured");
      toast.error("Couldn't add, please try again 🤯");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <BaseModal
        onSubmit={handleSubmit}
        title="Add university"
        button={<AddCard />}
      >
        <InputField
          label="University Name"
          name="name"
          onChange={handleInputChange}
          placeholder="Write unievrsity Name here"
          value={newUniversity?.name}
          type="text"
          required
        />
        <InputField
          label="University Email"
          name="email"
          onChange={handleInputChange}
          placeholder="Write unievrsity Email here"
          value={newUniversity?.email}
          type="email"
          required
        />
        <InputField
          label="Total students"
          name="totalStudents"
          onChange={handleInputChange}
          placeholder="Total students enrolled in the university"
          value={newUniversity?.totalStudents}
          type="number"
          required
        />
        <InputField
          label="University Image"
          name="image"
          onChange={handleFileChange}
          placeholder="Select University Image here"
          value={newUniversity?.image}
          type="file"
          required
        />
      </BaseModal>
      {data?.map((item: IUniversity) => (
        <UniversityCard key={item?._id} {...item} />
      ))}
    </div>
  );
};

export default Universities;
