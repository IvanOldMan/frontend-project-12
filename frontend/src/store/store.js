import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from './slices/authenticatedSlice.js';
import uiReducer from './slices/uiSlice.js';
import modalReducer from './slices/modalSlice.js';
import { channelApi } from './API/channelsAPI.js';
import { messageApi } from './API/messagesAPI.js';
import { authorizationAPI } from './API/authorizationAPI';

export default configureStore({
  reducer: {
    authentication: authenticatedReducer,
    ui: uiReducer,
    modal: modalReducer,
    [authorizationAPI.reducerPath]: authorizationAPI.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([channelApi.middleware, messageApi.middleware, authorizationAPI.middleware]),
});
