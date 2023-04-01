import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type User = {
  id: string
  name: string
  email: string
  picture: string
  family_name: string
  given_name: string
}

type UserData = {
  user: User
  cookie: string
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<User, string>({
      query: (token) => ({ url: 'signup', body: { token } }),
      transformResponse: (res: UserData) => res.user,
    }),
    login: builder.mutation<User, string>({
      query: (token) => ({ url: 'login', body: { token } }),
      transformResponse: (res: UserData) => res.user,
    }),
  }),
})

export const { useSignUpMutation } = userApi
