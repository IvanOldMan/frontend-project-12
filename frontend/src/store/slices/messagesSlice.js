import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
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
  useGetMessagesQuery,
} = messageApi;