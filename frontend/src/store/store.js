import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from './slices/authenticatedSlice.js';
import { channelApi } from './slices/channelsSlice.js';
import { messageApi } from './slices/messagesSlice.js';


export default configureStore({
  reducer: {
    authentication: authenticatedReducer,
    [channelApi.reducerPath]: channelApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelApi.middleware),
});
