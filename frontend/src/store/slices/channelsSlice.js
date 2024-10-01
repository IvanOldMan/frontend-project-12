import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/channels',
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    /*
    getUserById: builder.query({
      query: (id) => id,
    }),
    addUser: builder.mutation({
      query: (user) => ({
        method: 'POST',
        body: user,
      }),
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),

     */
    }),
});

export const {
  useGetChannelsQuery,
} = channelApi;