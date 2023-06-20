import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './user.slice'

export type Group = {
  groupName: string;
  members: User[];
  rounds: any[];
  isOwner: boolean;
}

export type GroupResponseData = {
  data: Group[];
}

export type CreateGroupData = {
  groupData: Pick<Group, 'groupName'>;
  authToken: string;
}

export type DeleteGroupData = {
  groupName: Group['groupName'];
  authToken: string;
}

export type DeleteGroupMemberData = {
  groupName: Group['groupName'];
  groupMemberId: User['id'];
  authToken: string;
}

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    createGroup: builder.mutation<Group[], CreateGroupData>({
      query: ({ groupData, authToken }) => ({ url: 'groups', headers: { Authorization: `Bearer ${authToken}`.toString() }, body: groupData, method: 'POST' }),
      transformResponse: (res: GroupResponseData) => res.data,
    }),
    deleteGroup: builder.mutation<Group[], DeleteGroupData>({
      query: ({ groupName, authToken }) => ({ url: `groups/${groupName}`, headers: { Authorization: `Bearer ${authToken}`.toString() }, method: 'DELETE' }),
      transformResponse: (res: GroupResponseData) => res.data,
    }),
    deleteGroupMember: builder.mutation<Group[], DeleteGroupMemberData>({
      query: ({ groupName, authToken, groupMemberId }) => ({ url: `groups/${groupName}/member/${groupMemberId}`, headers: { Authorization: `Bearer ${authToken}`.toString() }, method: 'DELETE' }),
      transformResponse: (res: GroupResponseData) => res.data,
    }),
  }),
})

export const { useCreateGroupMutation, useDeleteGroupMutation, useDeleteGroupMemberMutation } =
  groupApi
