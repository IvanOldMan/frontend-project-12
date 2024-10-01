import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    //addUser: usersAdapter.addOne,
    addMessages: messagesAdapter.addMany,
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
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
