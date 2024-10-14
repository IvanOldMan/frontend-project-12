import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authenticationRequest = createAsyncThunk(
  'authenticationRequest', // Id отображается в dev tools и должен быть уникальный у каждого thunk
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
      // перед отправкой запроса
      .addCase(authenticationRequest.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      // в случае успешного запроса
      .addCase(authenticationRequest.fulfilled, (state, {payload}) => {
        const { token, username } = payload;
        localStorage.setItem('AUTH_TOKEN', token);
        localStorage.setItem('USER_NAME', username);
        state.isAuthenticated = true;
        state.loadingStatus = 'successful';
        state.error = null;
      })
      // в случае ошибки запроса
      .addCase(authenticationRequest.rejected, (state, {payload}) => {
        state.loadingStatus = 'failed';
        state.isAuthenticated = false;
        state.error = payload;
      });
    },
});

export const { actions } = authenticatedSlice;
export default authenticatedSlice.reducer;
