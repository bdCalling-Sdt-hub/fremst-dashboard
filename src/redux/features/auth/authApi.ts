import { baseApi } from "../../base/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: build.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("resetToken")}`,
        },
      }),
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }), 

    getProfile: build.query({
      query: () => ({
        url: "/user/profile",
      }),
    }),  

    updateProfile: build.mutation({
      query: (data) => { 
        return{
          url: "/user",
          method: "PATCH",
          body: data,
        }
      },
    }),

  }),
});

export const {
  useLoginUserMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation, 
  useGetProfileQuery ,
  useUpdateProfileMutation
} = authApi;