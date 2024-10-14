import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from './slices/authenticatedSlice.js';
import conditionReducer from './slices/conditionSlice.js';
import modalReducer from './slices/modalSlice.js';
import { channelApi } from './API/channelsAPI.js';
import { messageApi } from './API/messagesAPI.js';

export default configureStore({
  reducer: {
    authentication: authenticatedReducer,
    condition: conditionReducer,
    modal: modalReducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelApi.middleware, messageApi.middleware]),
});
