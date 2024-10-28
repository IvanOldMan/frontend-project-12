import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import path from '../../utils/routes';

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: path.api.messages(),
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authentication;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

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
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messageApi;
