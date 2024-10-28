import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../store/slices/modalSlice.js';
import Channel from './channel.jsx';
import { ReactComponent as IconAddButton } from '../../assets/svg/addChannelButton_Icon.svg';

const Index = ({ channels }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpenModal = () => {
    dispatch(openModal({ type: 'add' }));
  };

  return (
    <Col xs={4} md={2} className="d-flex border-end px-0 bg-light flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>
          {t('channelsContainer.title')}
        </b>
        <Button
          className="p-0 text-primary"
          onClick={handleOpenModal}
          variant="group-vertical"
        >
          <IconAddButton />
          <span className="visually-hidden">+</span>
        </Button>
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
            <Channel
              channel={channel}
              key={channel.id}
            />
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
};

export default Index;
