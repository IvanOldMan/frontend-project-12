import React from "react";
import {useGetMessagesQuery} from "../store/slices/messagesSlice";
import MessageItem from "./MessageItem";

const MessagesContainer = () => {
  const {data: messages, error, isLoading} = useGetMessagesQuery('');

  return (
  <div className="col p-0 h-100">
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># general</b>
        </p>
        <span className="text-muted">0 сообщений</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
      <div className="mt-auto px-5 py-3">
        <form noValidate className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" />
            <button type="submit" disabled className="btn btn-group-vertical">
              <span className="visually-hidden">Отправить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default MessagesContainer;
