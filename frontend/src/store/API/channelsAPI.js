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
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        },

      }),
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channelData) => ({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        },
        body: {name: channelData},
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        },
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: id,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        },
        body: { name },
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelApi;
