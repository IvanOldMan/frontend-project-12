import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import path from '../../utils/routes.js';

export const channelApi = createApi({
  reducerPath: 'channelApi',
  baseQuery: fetchBaseQuery({
    baseUrl: path.api.channels(),
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authentication;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channelData) => ({
        method: 'POST',
        body: { name: channelData },
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: id,
        method: 'PATCH',
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
