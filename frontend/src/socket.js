import { io } from "socket.io-client";
import store from './store/store.js';
import { messageApi } from "./store/API/messagesAPI";
import { channelApi } from './store/API/channelsAPI.js';
import { actions as conditionActions } from './store/slices/conditionSlice.js';
import { useDispatch, useSelector } from "react-redux";

const socket = io();

export default class SocketInit {
  static messages() {
    socket.on('newMessage', (payload) => {
      store.dispatch(
      messageApi.util.updateQueryData('getMessages', undefined, (draftMessage) => {
        //console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        draftMessage.push(payload);
      }),
      )
    });
  };

  static channels() {
    const { activeChannelId, defaultChannelId, defaultChannelName } = useSelector((state) => state.condition);
    const dispatch = useDispatch();

    socket.on('newChannel', (payload) => {
      store.dispatch(
      channelApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        //console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
        draftChannels.push(payload);
      }),
      )
    });

    socket.on('renameChannel', ({ id, name}) => {
      store.dispatch(
      channelApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        //{ id: 7, name: "new name channel", removable: true }
        draftChannels.find((channel) => channel.id === id).name = name;
      }),
      )
    });

    socket.on('removeChannel', ({ id }) => {
      store.dispatch(
      channelApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        //console.log(payload); // => { id: 6 };
        if (id === activeChannelId) {
          dispatch(conditionActions.setActiveChannel({
            activeChannelId: defaultChannelId,
            activeChannelName: defaultChannelName,
          }));
        }
        return draftChannels.filter((channel) => channel.id !== id);
      }),
      )
    });
  }
}
