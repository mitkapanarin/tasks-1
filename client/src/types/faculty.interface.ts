export interface iFaculty {
  _id: string;
  name: string;
  email: string;
  image: string;
  universityOwner: string;
}

export interface GetAllFacultiesResponse {
  message: string;
  Faculty: iFaculty[];
}

export interface CreateFacultyRequest {
  name: string;
  email: string;
  _id: string;
  image: string;
  body: string;
}

export interface DeleteFacultyRequest {
  _id: string;
  facultyID: string;
}

export interface editFacultyRequest {
  name: string;
  email: string;
  _id: string;
  image: string;
  facultyID: string;
  updatedData: Partial<iFaculty>;
}