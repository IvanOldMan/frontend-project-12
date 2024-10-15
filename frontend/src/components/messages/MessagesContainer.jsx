import React, {useEffect, useRef} from "react";
import {useAddMessageMutation, useGetMessagesQuery} from "../../store/API/messagesAPI.js";
import MessageItem from "./MessageItem";
import loginImage from "../../images/login.jpg";
import {Field, Form, Formik} from "formik";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import leoProfanity from 'leo-profanity';
import {Button, Col} from "react-bootstrap";

const MessagesContainer = () => {

  const { activeChannelId, activeChannelName } = useSelector((state) => state.condition);
  const { t } = useTranslation();
  const messageInput = useRef(null);

  useEffect(() => {
    messageInput.current.focus();
  }, [activeChannelId]);

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
  <Col className="p-0 h-100">
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
      <Formik
        initialValues={{body: ''}}
        //validationSchema={SignupSchema}
        onSubmit={(values, {resetForm}) => {
        const {body} = values;
        const result = {
          body: leoProfanity.clean(body),
          channelId: activeChannelId,
          username: localStorage.getItem('USER_NAME')
        };
        addMessage(result);
        resetForm();
      }

      }
      >
        {({ dirty }) => (

        <div className="mt-auto px-5 py-3">
          <Form noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Field
                innerRef={messageInput}
                name="body"
                aria-label={t('messagesContainer.form.label')}
                placeholder={t('messagesContainer.form.placeholder')}
                className="border-0 p-0 ps-2 form-control"
              />
              <Button
              type="submit"
              variant={'group-vertical'}
              disabled={ !dirty || isAddingMessage }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </Button>
            </div>
          </Form>
        </div>
        )}
      </Formik>
    </div>
  </Col>
  );
};

export default MessagesContainer;
