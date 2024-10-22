import React from 'react';
import badWordsDictionary from '../../utils/badWordsDictionary';

const MessageItem = ({ message }) => {
  const { body, username, id } = message;
  const filteredMessageText = badWordsDictionary.clean(body);

  return (
    <div id={id} className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {filteredMessageText}
    </div>
  );
};

export default MessageItem;
