import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateFacultyRequest,
  DeleteFacultyRequest,
  editFacultyRequest,
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
    getFaculty: builder.query<iFaculty, string>({
      query: (_id) => `/get-one-faculty/${_id}`,
      providesTags: ["Faculty"],
    }),
    getAllFaculties: builder.query<GetAllFacultiesResponse, string>({
      query: (_id) => `/get-all-of-1-university/${_id}`,
      providesTags: ["Faculty"],
    }),
    createFaculty: builder.mutation<void, CreateFacultyRequest>({
      query: ({ body, _id }) => ({
        url: `/create/${_id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faculty"],
    }),
    deleteFaculty: builder.mutation<string, DeleteFacultyRequest>({
      query: ({ _id }) => ({
        url: `/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faculty"],
    }),
    editFaculty: builder.mutation<string, editFacultyRequest>({
      query: ({ _id, updatedData }) => ({
        url: `/update/${_id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Faculty"]
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
  useGetFacultyQuery} = FacultyApi;