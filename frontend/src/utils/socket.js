import { io } from 'socket.io-client';
import { messageApi } from '../store/API/messagesAPI.js';
import { channelApi } from '../store/API/channelsAPI.js';
import { actions as conditionActions } from '../store/slices/conditionSlice.js';
import store from '../store/store.js';

export default function webSocketInit() {
  // Создаем экземпляр сокета
  const socket = io();

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
          draftChannels.find((channel) => channel.id === id).name = name;
        }),
      );
    })
    .on('removeChannel', ({ id }) => {
      store.dispatch(
        channelApi.util.updateQueryData('getChannels', '', (draftChannels) => {
          const state = store.getState();
          if (id === state.condition.activeChannelId) {
            store.dispatch(conditionActions.setActiveChannel({
              activeChannelId: state.condition.defaultChannelId,
              activeChannelName: state.condition.defaultChannelName,
            }));
          }
          return draftChannels.filter((channel) => channel.id !== id);
        }),
      );
    });
}
