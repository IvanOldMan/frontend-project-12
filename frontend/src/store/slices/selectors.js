import { createSelector } from '@reduxjs/toolkit';

export const selectAuth = (state) => state.authentication;
export const selectUser = createSelector(
  selectAuth,
  (authState) => authState.username,
);
export const selectToken = createSelector(
  selectAuth,
  (authState) => authState.token,
);
export const selectIsAuth = createSelector(
  selectToken,
  selectUser,
  (token, username) => Boolean(token) && Boolean(username),
);

export const selectUi = (state) => state.ui;
export const selectChannelID = createSelector(
  selectUi,
  (uiState) => uiState.activeChannelId,
);
export const selectChannelName = createSelector(
  selectUi,
  (uiState) => uiState.activeChannelName,
);

export const selectModal = (state) => state.modal;
export const selectIsShown = createSelector(
  selectModal,
  (modalState) => modalState.isShown,
);
export const selectID = createSelector(
  selectModal,
  (modalState) => modalState.channelID,
);
export const selectName = createSelector(
  selectModal,
  (modalState) => modalState.channelName,
);
export const selectType = createSelector(
  selectModal,
  (modalState) => modalState.type,
);
