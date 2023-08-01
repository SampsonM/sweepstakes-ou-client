import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './user.slice'

export type Group = {
  id: string;
  groupName: string;
  members: User[];
  rounds: any[];
  isOwner: boolean;
  invitePhrase?: string;
}

type CreateGroupResponse = {
  groups: Group[];
  newGroup: Group;
  invitePhrase: string;
}

type DeleteGroupMemberResponse = {
  groups: Group[];
}

type DeleteGroupResponse = {
  groups: Group[];
  deletedGroup: Group;
}

export interface GroupResponse<T>{
  data: T
}

export type CreateGroupData = {
  groupData: Pick<Group, 'groupName'>;
  authToken: string;
}

export type JoinGroupData = {
  groupInvitePhrase: string;
  groupName: string;
  groupMemberId: string;
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
    createGroup: builder.mutation<CreateGroupResponse, CreateGroupData>({
      query: ({ groupData, authToken }) => ({
        url: 'groups',
        headers: { Authorization: `Bearer ${authToken}`.toString() },
        body: groupData,
        method: 'POST'
      }),
      transformResponse: (res: GroupResponse<CreateGroupResponse>) => res.data,
    }),
    joinGroup: builder.mutation<CreateGroupResponse, JoinGroupData>({
      query: ({ groupInvitePhrase, groupName, groupMemberId, authToken }) => ({
        url: `groups/${groupName}/member/${groupMemberId}`,
        headers: { Authorization: `Bearer ${authToken}`.toString() },
        body: { invitePhrase: groupInvitePhrase },
        method: 'POST'
      }),
      transformResponse: (res: GroupResponse<CreateGroupResponse>) => res.data,
    }),
    deleteGroup: builder.mutation<Group[], DeleteGroupData>({
      query: ({ groupName, authToken }) => ({ url: `groups/${groupName}`, headers: { Authorization: `Bearer ${authToken}`.toString() }, method: 'DELETE' }),
      transformResponse: (res: GroupResponse<DeleteGroupResponse>) => res.data.groups,
    }),
    deleteGroupMember: builder.mutation<DeleteGroupMemberResponse, DeleteGroupMemberData>({
      query: ({ groupName, authToken, groupMemberId }) => ({ url: `groups/${groupName}/member/${groupMemberId}`, headers: { Authorization: `Bearer ${authToken}`.toString() }, method: 'DELETE' }),
      transformResponse: (res: GroupResponse<DeleteGroupMemberResponse>) => res.data,
    }),
  }),
})

export const { useCreateGroupMutation, useDeleteGroupMutation, useDeleteGroupMemberMutation, useJoinGroupMutation } =
  groupApi
