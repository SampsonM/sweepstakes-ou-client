import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type User = {
  id: string
  name: string
  email: string
  picture: string
  family_name: string
  given_name: string
}

export type UserResponseData = {
  user: User
  cookie: string
}

type UserData = {
  data: User
  message: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponseData, string>({
      query: (token) => ({ url: 'signup', body: { token }, method: 'POST' }),
      transformResponse: (res: UserData, meta) => {
        const cookie = meta?.response?.headers.get('set-cookie') || ''
        return { user: res.data, cookie }
      },
    }),
    login: builder.mutation<UserResponseData, string>({
      query: (token) => ({ url: 'login', body: { token }, method: 'POST' }),
      transformResponse: (res: UserData, meta) => {
        const cookie = meta?.response?.headers.get('set-cookie') || ''
        return { user: res.data, cookie }
      },
    }),
    deleteAccount: builder.mutation<User, string>({
      query: (token) => ({
        url: 'users',
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: (res: UserData) => res.data,
    }),
  }),
})

export const { useSignUpMutation, useLoginMutation, useDeleteAccountMutation } =
  userApi
