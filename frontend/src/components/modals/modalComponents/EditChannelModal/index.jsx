import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { useEditChannelMutation, useGetChannelsQuery } from '../../../../store/API/channelsAPI';
import { setActiveChannel } from '../../../../store/slices/uiSlice.js';
import { closeModal } from '../../../../store/slices/modalSlice';
import badWordsDictionary from '../../../../utils/badWordsDictionary';
import { selectID, selectName, selectChannelID } from '../../../../store/slices/selectors';
import channelNameSchema from './schema.js';

const EditChannelModal = () => {
  const channelID = useSelector(selectID);
  const channelName = useSelector(selectName);
  const activeChannelId = useSelector(selectChannelID);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const editChannelInput = useRef(null);

  const { data: channels } = useGetChannelsQuery('');
  const channelsNames = channels.map(({ name }) => name);

  useEffect(() => {
    editChannelInput.current.focus();
    editChannelInput.current.select();
  }, []);

  const [editChannel] = useEditChannelMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmitForm = async ({ name: newChannelName }) => {
    try {
      const filteredChannelName = badWordsDictionary.clean(newChannelName.trim());
      const data = { id: channelID, name: filteredChannelName };
      const { id, name } = await editChannel(data).unwrap();
      toast.success(t('toast.channel.edit'));

      if (id === activeChannelId) {
        dispatch(setActiveChannel({
          activeChannelId: id,
          activeChannelName: name,
        }));
      }
    } catch (e) {
      toast.error(t('toast.errors.edit'));
    }
    dispatch(closeModal());
  };

  return (
    <Formik
      initialValues={{ name: channelName }}
      validate={async ({ name }) => {
        try {
          const filteredName = badWordsDictionary.clean(name.trim());
          await channelNameSchema(channelsNames).validate(filteredName);
          return {};
        } catch (validateError) {
          return { name: validateError.message };
        }
      }}
      onSubmit={handleSubmitForm}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              ref={editChannelInput}
              className="mb-2"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name && !!touched.name}
            />
            <Form.Label className="visually-hidden">
              {t('modal.editChannel.label')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              className="me-2"
              variant="secondary"
              onClick={handleClose}
            >
              {t('modal.buttons.close')}
            </Button>
            <Button
              type="submit"
            >
              {t('modal.buttons.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditChannelModal;
