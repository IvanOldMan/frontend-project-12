/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import LocalStorage from '../../utils/LocalStorageAdapter.js';

export const authenticationRequest = createAsyncThunk(
  'authenticationRequest',
  async ({ username, password, url }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1${url}`, { username, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.status);
    }
  },
);

const initialState = {
  isAuthenticated: false,
  error: null,
  loadingStatus: '',
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    setAuthenticated(state, { payload }) {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticationRequest.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(authenticationRequest.fulfilled, (state, { payload }) => {
        const { token, username } = payload;
        LocalStorage.setToken(token);
        LocalStorage.setUsername(username);
        state.isAuthenticated = true;
        state.loadingStatus = 'successful';
        state.error = null;
      })
      .addCase(authenticationRequest.rejected, (state, { payload }) => {
        state.loadingStatus = 'failed';
        state.isAuthenticated = false;
        state.error = payload;
      });
  },
});

export const { actions } = authenticatedSlice;
export default authenticatedSlice.reducer;
