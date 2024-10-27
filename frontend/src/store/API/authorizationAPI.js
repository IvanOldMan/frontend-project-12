import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import path from '../../utils/routes';

const axiosBaseQuery = ({ baseUrl }) => async ({ url, method, data }) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const authorizationAPI = createApi({
  reducerPath: 'authorizationAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: path.api.base(),
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: path.api.login(),
        method: 'post',
        data: userData,
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: path.api.signup(),
        method: 'post',
        data: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = authorizationAPI;
