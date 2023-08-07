import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Sport = 'football' | 'horse-racing'

export type SweepstakeEventResponse = {
  id: string
  eventName: string
  startDate: string
  endDate: string
  eventWinner: string
  participants: string
  inProgress: boolean
  sport: Sport
}

export type SweepstakeEvent = {
  id: string
  eventName: string
  startDate: string
  endDate: string
  eventWinner: string
  participants: string[]
  inProgress: boolean
  sport: Sport
}

export const sportIconMapping: Record<Sport, string> = {
  football: 'futbol',
  'horse-racing': 'horse-head',
}

type GetEventsResponse = {
  sweepstakeEvents: SweepstakeEventResponse[]
}

type GetEventsQuery = {
  authToken: string
  groupId: string
}

export interface Response<T> {
  data: T
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getEvents: builder.query<SweepstakeEvent[], GetEventsQuery>({
      query: ({ authToken, groupId }) => ({
        url: `events/${groupId}?future=true&removeUsedEvents=true`,
        headers: { Authorization: `Bearer ${authToken}`.toString() },
        method: 'GET',
      }),
      transformResponse: (res: Response<GetEventsResponse>) =>
        res.data.sweepstakeEvents.map((event) => ({
          ...event,
          participants: JSON.parse(event.participants),
        })),
    }),
  }),
})

export const { useGetEventsQuery, useLazyGetEventsQuery } = eventsApi
