import { useSelector } from "react-redux";
import { RootState, useGetAllUniversitiesQuery } from "../store/store";
import { IUniversity } from "../types/university.interface";
import UniversityCard from "../components/UniversityCard";

const Universities = () => {
  const state = useSelector((x: RootState) => x);
  console.log(state);

  const { data } = useGetAllUniversitiesQuery(undefined);
  console.log(data);
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.map((item: IUniversity) => (
        <UniversityCard key={item?._id} {...item} />
      ))}
    </div>
  );
};

export default Universities;