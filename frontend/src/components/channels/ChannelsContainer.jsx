import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as modalActions } from '../../store/slices/modalSlice.js';
import ChannelItem from './ChannelItem.jsx';

const ChannelsContainer = ({ channels }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const MemoButton = memo(Button);

  const handleOpenModal = useCallback(() => {
    dispatch(modalActions.openModal({ type: 'add' }));
  });

  return (
    <Col xs={4} md={2} className="d-flex border-end px-0 bg-light flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>
          {t('channelsContainer.title')}
        </b>
        <MemoButton
          className="p-0 text-primary"
          onClick={handleOpenModal}
          variant="group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
            />
            <path
              d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
            />
          </svg>
          <span className="visually-hidden">+</span>
        </MemoButton>
      </div>
      <Nav
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
        as="ul"
        id="channels-box"
        variant="pills"
        fill
      >
        {channels.map((channel) => (
          <Nav.Item
            as="li"
            className="w-100"
            key={channel.id}
          >
            <ChannelItem
              channel={channel}
              key={channel.id}
            />
          </Nav.Item>))}
      </Nav>
    </Col>
  );
};

export default ChannelsContainer;
