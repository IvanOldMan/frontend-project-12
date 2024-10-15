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
    addChannelModal(state) {
      state.isShown = true;
      state.type = 'add';
    },
    removeChannelModal(state, { payload }) {
      state.isShown = true;
      state.channelID = payload;
      state.type = 'remove';
    },
    editChannelModal(state, { payload }) {
      const { id, name } = payload;
      state.isShown = true;
      state.channelID = id;
      state.channelName = name;
      state.type = 'edit';
    },
    closeModal(state) {
      state.isShown = false;
      state.channelID = null;
      state.channelName = null;
      state.type = null;
    },

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
