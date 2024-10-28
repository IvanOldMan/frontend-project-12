import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Channels from '../components/channels/index.jsx';
import Messages from '../components/messages/index.jsx';
import { useGetMessagesQuery } from '../store/API/messagesAPI';
import { useGetChannelsQuery } from '../store/API/channelsAPI';
import Spinner from '../components/Spinner.jsx';

const ChatPage = () => {
  const { data: messages = [], isLoading: isChannelsIsLoading } = useGetMessagesQuery('');
  const { data: channels = [], isLoading: isMessagesIsLoading } = useGetChannelsQuery('');

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      {(isChannelsIsLoading || isMessagesIsLoading) && <Spinner />}
      <Row className="h-100 bg-white flex-md-row">
        <Channels channels={channels} />
        <Messages messages={messages} />
      </Row>
    </Container>
  );
};

export default ChatPage;
