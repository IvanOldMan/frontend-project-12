import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAddMessageMutation } from '../../store/API/messagesAPI.js';
import { selectUser, selectChannelID } from '../../store/slices/selectors';
import { ReactComponent as IconSendButton } from '../../assets/svg/sandMessageButton_Icon.svg';
import badWordsDictionary from '../../utils/badWordsDictionary.js';
import messageSchema from './schema';

const MessageForm = () => {
  const { t } = useTranslation();
  const messageInput = useRef(null);
  const activeChannelId = useSelector(selectChannelID);
  const currentUsername = useSelector(selectUser);

  useEffect(() => {
    messageInput.current.focus();
  }, []);

  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();

  const handleSubmitForm = async ({ body: messageText }, { resetForm }) => {
    const filteredMessage = badWordsDictionary.clean(messageText.trim());
    const result = {
      body: filteredMessage,
      channelId: activeChannelId,
      username: currentUsername,
    };
    await addMessage(result);
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
                disabled={isAddingMessage}
              />
              <Button
                type="submit"
                variant="group-vertical"
                disabled={!isValid || !dirty || isAddingMessage}
              >
                <IconSendButton />
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageForm;
