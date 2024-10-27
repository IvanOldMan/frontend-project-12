import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col } from 'react-bootstrap';
import MessageItem from './MessageItem.jsx';
import MessageForm from '../forms/MessageForm.jsx';
import selectors from '../../store/slices/selectors';

const MessagesContainer = ({ messages }) => {
  const activeChannelId = useSelector(selectors.currentChannelID);
  const activeChannelName = useSelector(selectors.currentChannelName);
  const { t } = useTranslation();

  const currentMessages = useMemo(
    () => messages.filter(({ channelId }) => channelId === activeChannelId),
    [activeChannelId, messages],
  );

  useEffect(() => {
    const messagesBox = document.getElementById('messages-box');
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }, [currentMessages]);

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
            <MessageItem
              message={message}
              key={message.id}
            />
          ))}
        </div>
        <MessageForm />
      </div>
    </Col>
  );
};

export default MessagesContainer;
