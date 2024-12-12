import { baseApi } from "../../base/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({  
 
        getAllProducts: build.query({ 
            query:(page)=>{ 
                const params = new URLSearchParams() 
                if(page)params.append('page', page) 
               
                return{ 
                    url:`/product?${params.toString()}` , 
                } 
            } 
        }) , 
 
        addNewProduct: build.mutation({ 
            query: (data) => ( 
                { 
                    url: "/product/create", 
                    method: "POST", 
                    body: data, 
                } 
            ),
        }) , 

        getAllSteps: build.query({
            query: (id) => { 
                return{
                    url: `/question/steps/product/${id}`,
                }
            },
        }) , 

        addNewStep: build.mutation({ 
            query: (formData) => ( 
                { 
                    url: "/question/steps/create", 
                    method: "POST", 
                    body: formData, 
                } 
            ),
        }) , 

        deleteSteps: build.mutation({
            query: (id) => ({
                url: `/question/steps/${id}`,
                method: "DELETE",
            }),
        }) , 

        addQuestion: build.mutation({
            query: (data) => ({
                url: "/question/create",
                method: "POST",
                body: data,
            }),
        }) , 

        getAllQuestions: build.query({
            query: (id) => {
                return {
                    url: `/question/step/${id}`,
                }
            },
        }) , 

        updateQuestion: build.mutation({
            query: (editData) => ({
                url: `/question/${editData?.id}`,
                method: "PATCH",
                body: editData,
            }),
        }) , 

        deleteQuestion: build.mutation({
            query: (id) => ({
                url: `/question/${id}`,
                method: "DELETE",
            }),
        }) ,

     }) 
}) 

export const {useGetAllProductsQuery , useAddNewProductMutation , useGetAllStepsQuery , useAddNewStepMutation , useDeleteStepsMutation , useAddQuestionMutation , useGetAllQuestionsQuery , useUpdateQuestionMutation , useDeleteQuestionMutation} = productsApi