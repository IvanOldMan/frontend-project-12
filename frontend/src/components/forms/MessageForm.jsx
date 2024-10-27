import React, { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAddMessageMutation } from '../../store/API/messagesAPI.js';
import selectors from '../../store/slices/selectors';

const MessageForm = () => {
  const { t } = useTranslation();
  const messageInput = useRef(null);
  const activeChannelId = useSelector(selectors.currentChannelID);
  const currentUsername = useSelector(selectors.username);

  const messageSchema = Yup.object().shape({
    body: Yup.string()
      .trim()
      .required(),
  });

  useEffect(() => {
    messageInput.current.focus();
  }, []);

  const MemoButton = memo(Button);

  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();

  const handleSubmitForm = async ({ body }, { resetForm }) => {
    const result = {
      body,
      channelId: activeChannelId,
      username: currentUsername,
    };
    addMessage(result);
    resetForm();
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Formik
        initialValues={{ body: '' }}
        validationSchema={messageSchema}
        onSubmit={handleSubmitForm}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isValid,
          dirty,
        }) => (
          <Form
            className="py-1 border rounded-2"
            noValidate
            onSubmit={handleSubmit}
          >
            <InputGroup hasValidation>
              <Form.Control
                ref={messageInput}
                name="body"
                placeholder={t('messagesContainer.form.placeholder')}
                aria-label={t('messagesContainer.form.label')}
                className="border-0 p-0 ps-2"
                value={values.body}
                onChange={handleChange}
              />
              <MemoButton
                type="submit"
                variant="group-vertical"
                disabled={!isValid || !dirty || isAddingMessage}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </MemoButton>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
