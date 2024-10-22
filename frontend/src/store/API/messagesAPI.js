import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import LocalStorage from '../../utils/LocalStorageAdapter.js';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${LocalStorage.getToken()}`);
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (messageData) => ({
        method: 'POST',
        body: messageData,
      }),
      invalidatesTags: ['Message'],
    }),

    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messageApi;
