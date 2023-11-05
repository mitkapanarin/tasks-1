import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  UniversityApi,
  useCreateUniversityMutation,
  useDeleteUniversityMutation,
  useGetAllUniversitiesQuery,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
} from "./API/UniversityApi";
import { FacultyApi } from "./API/FacultyApi";

export const store = configureStore({
  reducer: {
    [UniversityApi.reducerPath]: UniversityApi.reducer,
    [FacultyApi.reducerPath]: FacultyApi.reducer,
    // User: userSlice.reducer, // Configures the reducer for the userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UniversityApi.middleware,
      FacultyApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export {
  useCreateUniversityMutation,
  useDeleteUniversityMutation,
  useGetAllUniversitiesQuery,
  useGetUniversityQuery,
  useUpdateUniversityMutation,
}