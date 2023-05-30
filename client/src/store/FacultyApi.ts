import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateFacultyRequest,
  DeleteFacultyRequest,
  EditFacultyRequest,
  GetAllFacultiesResponse,
  iFaculty,
} from "../../types/faculty.interface";

export const FacultyApi = createApi({
  reducerPath: "FacultyApi",
  tagTypes: ["Faculty"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_API_BASE_URL}/api/faculty`,
  }),
  endpoints: (builder) => ({
    getFaculty: builder.query<
      iFaculty,
      {
        _id: string;
        facultyID: string;
      }
    >({
      query: ({ _id, facultyID }) => `/get-one-faculty/${_id}/${facultyID}`,
      providesTags: ["Faculty"],
    }),
    getAllFaculties: builder.query<GetAllFacultiesResponse, string>({
      query: (_id) => `/get-all-faculties/${_id}`,
      providesTags: ["Faculty"],
    }),
    createFaculty: builder.mutation<void, CreateFacultyRequest>({
      query: ({ body, _id }) => ({
        url: `/create-faculty/${_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faculty"],
    }),
    deleteFaculty: builder.mutation<void, DeleteFacultyRequest>({
      query: ({ _id, facultyID }) => ({
        url: `/delete-faculty/${_id}/${facultyID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),
    editFaculty: builder.mutation<void, EditFacultyRequest>({
      query: ({ _id, facultyID, updatedData }) => ({
        url: `/update-faculty/${_id}/${facultyID}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Faculty"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateFacultyMutation,
  useEditFacultyMutation,
  useGetAllFacultiesQuery,
  useDeleteFacultyMutation,
  useGetFacultyQuery,
} = FacultyApi;