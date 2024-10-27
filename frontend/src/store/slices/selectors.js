export default {
  token: (state) => state.authentication.token,
  username: (state) => state.authentication.username,
  currentChannelID: (state) => state.condition.activeChannelId,
  currentChannelName: (state) => state.condition.activeChannelName,
  isShownModal: (state) => state.modal.isShown,
  channelIdModal: (state) => state.modal.channelID,
  channelNameModal: (state) => state.modal.channelName,
  modalType: (state) => state.modal.type,
};
