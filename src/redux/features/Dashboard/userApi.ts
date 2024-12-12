import { baseApi } from "../../base/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({   

        getAllUsers: build.query({ 
            query:(page)=>{ 
                const params = new URLSearchParams() 
                if(page)params.append('page', page) 
                return{
                    url:`/user/admins?${params.toString()}`,
                }
            }
        }) , 

        createUser: build.mutation({
            query: (data) => ({
                url: "/user",
                method: "POST",
                body: data,
            }),
        }) , 

        holdUser:build.mutation({ 
            query:(id)=>{ 
                return{ 
                    url:`/user/hold/${id}` ,
                    method:"POST" ,
                }
            } 
        })

    }) 
}) 

export const {useGetAllUsersQuery , useCreateUserMutation , useHoldUserMutation } = userApi