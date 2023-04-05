import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type User = {
  id: string,
  name: string,
  email: string,
  picture: string,
  family_name: string,
  given_name: string
}

export type UserData = {
  user: User,
  cookie: string
}

export type UserResponseData = {
  data: UserData,
  message: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserData, string>({
      query: (token) => ({ url: 'signup', body: { token }, method: 'POST' }),
      transformResponse: (res: UserResponseData) => res.data,
    }),
    login: builder.mutation<UserData, string>({
      query: (token) => ({ url: 'login', body: { token }, method: 'POST' }),
      transformResponse: (res: UserResponseData) => res.data,
    }),
    verify: builder.mutation<UserData, { authToken: string, idToken: string}>({
      query: ({ authToken, idToken }) => ({ url: 'verify', headers: { Authorization: `Bearer ${authToken}`.toString() }, body: { idToken }, method: 'POST' }),
      transformResponse: (res: UserResponseData) => res.data,
    }),
    deleteAccount: builder.mutation<User, string>({
      query: (token) => ({
        url: 'users',
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (res: UserData) => res.data,
    })
  }),
})

export const { useSignUpMutation, useLoginMutation, useDeleteAccountMutation, useVerifyMutation } =
  userApi
