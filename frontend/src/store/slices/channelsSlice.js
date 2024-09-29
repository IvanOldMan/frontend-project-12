import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    //addUser: usersAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    // Если нужна дополнительная обработка, то создаем свою функцию
    //removeUser: (state, { payload }) => {
      // ...
      // Внутри можно вызвать метод адаптера
      //usersAdapter.removeOne(state, payload);
    //},
    //updateUser: usersAdapter.updateOne,
  },
});

//export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);