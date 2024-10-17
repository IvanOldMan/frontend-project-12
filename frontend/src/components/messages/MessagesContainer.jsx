import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import { useGetMessagesQuery } from '../../store/API/messagesAPI.js';
import MessageItem from './MessageItem.jsx';
import MessageForm from '../forms/MessageForm.jsx';

const MessagesContainer = () => {
  const { activeChannelId, activeChannelName } = useSelector((state) => state.condition);
  const { t } = useTranslation();

  const { data: messages } = useGetMessagesQuery('');

  const currentMessages = messages
    ?
    messages.filter(({ channelId }) => channelId === activeChannelId)
    :
    [];

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('messagesContainer.messageCount.message', { count: currentMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessages.map((message) => (
            // eslint-disable-next-line
            <MessageItem
              message={message}
              key={message.id}
            />))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default MessagesContainer;
