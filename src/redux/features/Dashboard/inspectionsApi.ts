import { baseApi } from "../../base/baseApi";

const inspectionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({


    getAllInspections: build.query({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams()
        if (page) params.append('page', page)
        if (limit) params.append('limit', limit)
        if (search) params.append('search', search)

        return {
          url: `/inspection?${params.toString()}`,
        }
      },
    }),


    getInspectionHistory: build.query({
      query: ({ productId, customerId }) => {
        const params = new URLSearchParams()
        if (productId) params.append('product', productId)
        if (customerId) params.append('customer', customerId)

        return {
          url: `/inspection?${params.toString()}`,
        }
      },
    }),

    deleteInspectionHistory: build.mutation({
      query: (id) => {
        return {
          url: `/inspection/${id}`,
          method: "DELETE",
        }
      }
    }),

    addInspectionHistory: build.mutation({
      query: (formData) => {
        return {
          url: `/oldinspection/create`,
          method: "POST",
          body: formData
        }
      }
    }),

    getAllProductsInspections: build.query({
      query: (id) => {
        return {
          url: `/question/steps/product/${id}`
        }
      }
    }),

    getInpectionsQuestion: build.query({
      query: (id) => {
        return {
          url: `/question/step/${id}`,
        }
      }
    }),

    createInspection: build.mutation({
      query: (formData) => {
        return {
          url: `/inspection/create`,
          method: "POST",
          body: formData
        }
      }
    }),

    getAllEmployees: build.query({
      query: (id) => {
        const params = new URLSearchParams()
        if (id) params.append('company', id)
        return {
          url: `/employee?${params.toString()}`,
        }
      },
    }),


    getPDF: build.mutation({
      query: (id: string) => ({
        url: `/pdf/create/${id}`,
        method: 'GET',
      }),
    }),

  })
});

export const { useGetAllInspectionsQuery, useGetInspectionHistoryQuery, useDeleteInspectionHistoryMutation, useAddInspectionHistoryMutation, useGetAllProductsInspectionsQuery, useGetInpectionsQuestionQuery, useCreateInspectionMutation, useGetAllEmployeesQuery , useGetPDFMutation } = inspectionsApi;