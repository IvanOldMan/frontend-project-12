import React from 'react';
import { Container, Row } from 'react-bootstrap';
import ChannelsContainer from '../components/channels/ChannelsContainer.jsx';
import MessagesContainer from '../components/messages/MessagesContainer.jsx';

const ChatPage = () => (
  // eslint-disable-next-line
  <>
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <MessagesContainer />
      </Row>
    </Container>
  </>
);

export default ChatPage;
