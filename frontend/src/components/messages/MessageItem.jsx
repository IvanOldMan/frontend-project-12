import React from 'react';

const MessageItem = ({ message }) => {
  const { body, username } = message;
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  );
};

export default MessageItem;
