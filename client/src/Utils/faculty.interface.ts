export interface iFaculty {
  _id: string;
  name: string;
  email: string;
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
  body: string | string;
}

export interface DeleteFacultyRequest {
  _id: string;
  facultyID: string;
}

export interface EditFacultyRequest {
  _id: string;
  facultyID: string;
  updatedData: Partial<iFaculty>;
}