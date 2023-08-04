import { API_URL } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type SweepstakeEvent = {
  id: string;
  eventName: string;
  startDate: string;
  endDate: string;
  eventWinner: string;
  participants: string[];
  inProgress: boolean;
}

type GetEventsResponse = {
  sweepstakeEvents: SweepstakeEvent[];
}

type GetEventsQuery = {
  authToken: string;
}

export interface Response<T> {
  data: T
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getEvents: builder.query<SweepstakeEvent[], GetEventsQuery>({
      query: ({ authToken }) => ({
        url: 'events?future=true',
        headers: { Authorization: `Bearer ${authToken}`.toString() },
        method: 'GET'
      }),
      transformResponse: (res: Response<GetEventsResponse>) => res.data.sweepstakeEvents,
    }),
  }),
})

export const { useGetEventsQuery, useLazyGetEventsQuery } =
  eventsApi
