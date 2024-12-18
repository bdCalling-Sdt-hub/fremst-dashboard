import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "../../utils/LocalStorage";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://164.90.205.5:3001/api/v1",
  // baseUrl: "http://192.168.10.15:3001/api/v1", 
  prepareHeaders: (headers, { getState }) => {
    const token = getFromLocalStorage("AccessToken"); 
   
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: () => ({}),
}); 

export const imageUrl = "http://164.90.205.5:3001";
