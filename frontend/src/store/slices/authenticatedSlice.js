import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from "axios";

export const authenticationRequest = createAsyncThunk(
'authenticationRequest', // Id отображается в dev tools и должен быть уникальный у каждого thunk
async ({ username, password, url }) => {
  const response = await axios.post(`/api/v1${url}`, { username, password });
  console.log('RD:', response.data);
  return response.data;
}
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
    setAuthenticated(state, {payload}) {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticationRequest.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(authenticationRequest.fulfilled, (state, {payload}) => {
        const { token, username } = payload;
        localStorage.setItem('AUTH_TOKEN', token);
        localStorage.setItem('USER_NAME', username);
        state.isAuthenticated = true;
        state.loadingStatus = 'successful';
        state.error = null;
      })
      // Вызывается в случае ошибки
      .addCase(authenticationRequest.rejected, (state, {error}) => {
        state.loadingStatus = 'failed';
        state.isAuthenticated = false;
        state.error = error.message;
      });
    },
});

export const { actions } = authenticatedSlice;
export default authenticatedSlice.reducer;
