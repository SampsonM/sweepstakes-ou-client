import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SweepstakeEvent } from './events.slice'

export interface UserEventParticipantAssociation {
  givenName: string
  eventParticipantName: string
}

export type SweepstakeRound = {
  id: string
  groupId: string
  event: SweepstakeEvent
  userEventParticipantAssociations: UserEventParticipantAssociation[]
}

type GetRoundsResponse = {
  sweepstakeRounds: SweepstakeRound[]
}

type GetRoundsQuery = {
  authToken: string
  groupName: string
  groupId: string
  eventId: string
}

export interface Response<T> {
  data: T
}

export const roundsApi = createApi({
  reducerPath: 'roundsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getRoundsById: builder.query<SweepstakeRound[], GetRoundsQuery>({
      query: ({ authToken, groupId }) => ({
        url: `rounds/${groupId}`,
        headers: { Authorization: `Bearer ${authToken}`.toString() },
        method: 'GET',
      }),
      transformResponse: (res: Response<GetRoundsResponse>) =>
        res.data.sweepstakeRounds,
    }),
    startRound: builder.mutation<SweepstakeRound[], GetRoundsQuery>({
      query: ({ authToken, groupName, groupId, eventId }) => ({
        url: `rounds/${groupId}`,
        headers: { Authorization: `Bearer ${authToken}`.toString() },
        method: 'POST',
        body: {
          groupName,
          eventId,
        },
      }),
      transformResponse: (res: Response<GetRoundsResponse>) =>
        res.data.sweepstakeRounds,
    }),
  }),
})

export const {
  useGetRoundsByIdQuery,
  useLazyGetRoundsByIdQuery,
  useStartRoundMutation,
} = roundsApi
