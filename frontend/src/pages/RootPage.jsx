import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ChannelsContainer from '../components/channels/ChannelsContainer.jsx';
import MessagesContainer from '../components/messages/MessagesContainer.jsx';

const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentToken = localStorage.getItem('AUTH_TOKEN');
    if (!currentToken) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
