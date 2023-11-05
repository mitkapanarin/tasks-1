import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IUniversity,
  UpdateUniversityRequest,
} from "../../types/university.interface";

export const UniversityApi = createApi({
  reducerPath: "UniversityApi",
  tagTypes: ["University"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getUniversity: builder.query<IUniversity, string>({
      query: (_id) => `/api/university/get-one/${_id}`,
      providesTags: ["University"],
    }),

    getAllUniversities: builder.query<IUniversity[], undefined>({
      query: () => "/api/university/get-all",
      providesTags: ["University"],
    }),

    updateUniversity: builder.mutation<string, UpdateUniversityRequest>({
      query: (body) => ({
        url: `/api/university/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["University"],
    }),

    createUniversity: builder.mutation<
      void,
      Omit<IUniversity, "_id" | "faculties">
    >({
      query: (body) => ({
        url: "/api/university/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["University"],
    }),

    deleteUniversity: builder.mutation<string, { _id: string }>({
      query: ({ _id }) => ({
        url: `/api/university/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["University"],
    }),
  }),
});

export const {
  useCreateUniversityMutation,
  useDeleteUniversityMutation,
  useGetAllUniversitiesQuery,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
} = UniversityApi;
