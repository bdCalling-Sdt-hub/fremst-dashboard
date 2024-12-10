import { baseApi } from "../../base/baseApi";

const homeApi = baseApi.injectEndpoints({
    endpoints: (build) => ({ 
 
        getHomeData: build.query({
            query: () => ({
              url: "/user/home",
            }),
          }), 

          inspectionById: build.query({
            query: (id) => ({
              url: `/inspection/${id}`,
            }),
          }),
     }) 
}) 

export const {useGetHomeDataQuery , useInspectionByIdQuery}  =homeApi