import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  channelID: null,
  channelName: null,
  type: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    isModalOpen(state, { payload }) {
      state.isShown = payload;
    },
    setChannelID(state, { payload }) {
      state.channelID = payload;
    },
    setChannelName(state, { payload }) {
      state.channelName = payload;
    },
    setModalType(state, { payload }) {
      state.type = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
