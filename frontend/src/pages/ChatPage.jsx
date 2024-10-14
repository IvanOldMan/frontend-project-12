import React from 'react';
import ChannelsContainer from "../components/channels/ChannelsContainer";
import MessagesContainer from "../components/messages/MessagesContainer";
import ModalContainer from "../components/modals/ModalContainer";
import {ToastContainer} from "react-toastify";
import {Container, Row} from "react-bootstrap";

const ChatPage = () => {

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <ChannelsContainer />
          <MessagesContainer />
        </Row>
      </Container>
    </>
  );
};

export default ChatPage;
