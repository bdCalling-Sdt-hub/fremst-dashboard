import { baseApi } from "../../base/baseApi";

const inspectionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllInspections: build.query({
      query: ({ page , limit , search  }) => {  
        const params = new URLSearchParams() 
        if(page)params.append('page', page)
        if(limit)params.append('limit', limit) 
        if(search)params.append('search', search)

        return{
          url: `/inspection?${params.toString()}`,
          
        }
      },
    }),
  }),
});

export const { useGetAllInspectionsQuery } = inspectionsApi;