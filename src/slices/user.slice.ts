import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Group } from './group.slice'

export type User = {
  id?: string;
  picture: string;
  fullName: string;
}

export type Rounds = {
  id: string;
  eventName: string;
  groupName: string;
  userTeamAssociations: string;
}

export type UserData = {
  user: User;
  groups: Group[];
}

export type UserResponseData = {
  data: UserData;
  cookie: string;
  message?: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    signUp: builder.mutation<UserResponseData, string>({
      query: (token) => ({ url: 'signup', body: { token }, method: 'POST' })
    }),
    login: builder.mutation<UserResponseData, string>({
      query: (token) => ({ url: 'login', body: { token }, method: 'POST' })
    }),
    verify: builder.mutation<UserResponseData, { authToken: string, idToken: string}>({
      query: ({ authToken, idToken }) => ({ url: 'verify', headers: { Authorization: `Bearer ${authToken}`.toString() }, body: { idToken }, method: 'POST' })
    }),
    deleteAccount: builder.mutation<UserResponseData, string>({
      query: (token) => ({
        url: 'users',
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
    })
  }),
})

export const { useSignUpMutation, useLoginMutation, useDeleteAccountMutation, useVerifyMutation } =
  userApi
