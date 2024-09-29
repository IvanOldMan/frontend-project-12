import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  isAuthenticated: false,
};

const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState,
  reducers: {
    setUsername(state, { payload }) {
      state.username = payload;
    },
    setAuthenticated(state, { payload }) {
      state.isAuthenticated = payload;
    }
  },
});

export const { actions } = authenticatedSlice;
export default authenticatedSlice.reducer;