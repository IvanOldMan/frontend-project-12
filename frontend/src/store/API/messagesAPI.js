import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',

  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        },
      }),
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (messageData) => ({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`,
        },
        body: messageData,
      }),
      invalidatesTags: ['Message'],
    }),

    //removeUser: builder.mutation({
    //  query: (id) => ({
    //    url: id,
    //    method: 'DELETE',
    //  }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messageApi;
