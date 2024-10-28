import { messageApi } from '../store/API/messagesAPI.js';
import { channelApi } from '../store/API/channelsAPI.js';
import { setDefaultChannel } from '../store/slices/uiSlice.js';

const webSocketInit = (socket, store) => {
  socket
    .on('newMessage', (payload) => {
      store.dispatch(
        messageApi.util.updateQueryData('getMessages', '', (draftMessages) => {
          draftMessages.push(payload);
        }),
      );
    })
    .on('newChannel', (payload) => {
      store.dispatch(
        channelApi.util.updateQueryData('getChannels', '', (draftChannels) => {
          draftChannels.push(payload);
        }),
      );
    })
    .on('renameChannel', ({ id, name }) => {
      store.dispatch(
        channelApi.util.updateQueryData('getChannels', '', (draftChannels) => {
          // eslint-disable-next-line
          draftChannels.find((channel) => channel.id === id).name = name;
        }),
      );
    })
    .on('removeChannel', ({ id }) => {
      store.dispatch(
        channelApi.util.updateQueryData('getChannels', '', (draftChannels) => {
          const state = store.getState();
          if (id === state.ui.activeChannelId) {
            store.dispatch(setDefaultChannel());
          }
          return draftChannels.filter((channel) => channel.id !== id);
        }),
      );
    });
};

export default webSocketInit;
