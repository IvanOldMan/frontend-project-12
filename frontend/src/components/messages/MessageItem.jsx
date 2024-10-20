import React from 'react';
import badWordsDictionary from '../../utils/badWordsDictionary';

const MessageItem = ({ message }) => {
  const { body, username } = message;
  const filteredMessageText = badWordsDictionary.clean(body);

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {filteredMessageText}
    </div>
  );
};

export default MessageItem;
