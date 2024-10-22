import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ChannelsContainer from '../components/channels/ChannelsContainer.jsx';
import MessagesContainer from '../components/messages/MessagesContainer.jsx';
import LocalStorage from '../utils/LocalStorageAdapter.js';

const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!LocalStorage.isHaveToken()) {
      navigate('/login');
    }
  }, []); // eslint-disable-line

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <MessagesContainer />
      </Row>
    </Container>
  );
};

export default RootPage;
