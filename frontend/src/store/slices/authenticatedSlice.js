/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_NAME = 'USER_NAME';

const initialState = {
  token: localStorage.getItem(AUTH_TOKEN),
  username: localStorage.getItem(USER_NAME),
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    setAuthenticated(state, { payload }) {
      const { token, username } = payload;
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(USER_NAME, username);
      state.token = token;
      state.username = username;
    },
    removeAuthenticated(state) {
      localStorage.clear();
      state.token = null;
      state.username = null;
    },
  },
});

export const { actions } = authenticatedSlice;
export default authenticatedSlice.reducer;
