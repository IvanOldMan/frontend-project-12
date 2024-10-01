import { configureStore } from '@reduxjs/toolkit';
import authenticatedReducer from './slices/authenticatedSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';


export default configureStore({
  reducer: {
    authentication: authenticatedReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
