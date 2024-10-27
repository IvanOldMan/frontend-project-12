/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  channelID: null,
  channelName: null,
  type: 'close',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => ({ ...initialState, ...payload, isShown: true }),
    closeModal() {
      return initialState;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
