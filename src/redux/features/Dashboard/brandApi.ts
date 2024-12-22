import { baseApi } from "../../base/baseApi";

const brandsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
 
        getAllBrands: build.query({ 
            query:(page)=>{ 
                const params = new URLSearchParams() 
                if(page)params.append('page', page) 
                return{ 
                    url:`/brand?${params.toString()}` , 
                } 
            } 
        }) , 

        addBrand: build.mutation({
            query: (data) => ({
                url: "/brand/create",
                method: "POST",
                body: data,
            }),
        })  ,

        editBrand: build.mutation({
            query: (data) => ({
                url: `/brand/${data?.id}`,
                method: "PATCH",
                body: data,
            }),
        }) ,


        deleteBrand:build.mutation({
            query:(id)=>{
                return{
                    url:`/brand/${id}` ,
                    method:"DELETE" ,
                }
            }
        })  ,   

      }) 
}) 

export const {useGetAllBrandsQuery , useAddBrandMutation  ,useEditBrandMutation , useDeleteBrandMutation} = brandsApi