import { baseApi } from "../../base/baseApi";

const customersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
 
        getAllCustomers: build.query({ 
            query:({page , search})=>{ 
                const params = new URLSearchParams() 
                if(page)params.append('page', page) 
                if(search)params.append('search', search)
                return{ 
                    url:`/customer/all?${params.toString()}` , 
                } 
            } 
        }) , 

        addCustomer: build.mutation({
            query: (data) => ({
                url: "/customer/add",
                method: "POST",
                body: data,
            }),
        })  ,

        editCustomer: build.mutation({
            query: (data) => ({
                url: `/customer/${data?.id}`,
                method: "PATCH",
                body: data,
            }),
        }) ,


        deleteCustomer:build.mutation({
            query:(id)=>{
                return{
                    url:`/customer/${id}` ,
                    method:"DELETE" ,
                }
            }
        })  ,  


      }) 
}) 

export const {useGetAllCustomersQuery , useAddCustomerMutation  ,useEditCustomerMutation , useDeleteCustomerMutation} = customersApi