/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannelId: '1',
  activeChannelName: 'general',
};

const conditionSlice = createSlice({
  name: 'condition',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      const { activeChannelId, activeChannelName } = payload;
      state.activeChannelId = activeChannelId;
      state.activeChannelName = activeChannelName;
    },
    setDefaultChannel() {
      return initialState;
    },
  },
});

export const { actions } = conditionSlice;
export default conditionSlice.reducer;
