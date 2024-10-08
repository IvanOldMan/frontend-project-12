import React from "react";
import {useAddMessageMutation, useGetMessagesQuery} from "../../store/API/messagesAPI.js";
import MessageItem from "./MessageItem";
import loginImage from "../../images/login.jpg";
import {Field, Form, Formik} from "formik";
import Socket from "../../socket.js";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import leoProfanity from 'leo-profanity';

const MessagesContainer = () => {
  Socket.messages();
  const { activeChannelId, activeChannelName } = useSelector((state) => state.condition);
  const { t } = useTranslation();

  const [
    addMessage,
    { error: addMessageError, isLoading: isAddingMessage },
  ] = useAddMessageMutation();

  const {data: messages, error, isLoading} = useGetMessagesQuery('');

  const currentMessages = messages
    ?
    messages.filter(({channelId}) => channelId === activeChannelId)
    :
    [];

  return (
        <Formik
        initialValues={{ body: ''}}
        //validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          const { body } = values;
          const result = {
            body: leoProfanity.clean(body),
            channelId: activeChannelId,
            username: localStorage.getItem('USER_NAME')};
          addMessage(result);
          resetForm();
        }

        }
        >
          {() => (
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    # {activeChannelName}
                  </b>
                </p>
                <span className="text-muted">
                   {t('messagesContainer.messageCount.message', {count: currentMessages.length})}
                </span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5">
                {currentMessages.map((message) => <MessageItem
                      message={message}
                      key={message.id}
                    />)
                }
              </div>
              <div className="mt-auto px-5 py-3">
                <Form noValidate className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <Field
                    name="body"
                    aria-label={t('messagesContainer.form.label')}
                    placeholder={t('messagesContainer.form.placeholder')}
                    className="border-0 p-0 ps-2 form-control"
                    />
                    <button type="submit" className="btn btn-group-vertical">
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>

          )}
        </Formik>
  );
};

export default MessagesContainer;
