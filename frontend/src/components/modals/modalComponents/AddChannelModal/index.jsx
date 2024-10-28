import React, {
  useEffect,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../../../store/API/channelsAPI.js';
import { closeModal } from '../../../../store/slices/modalSlice.js';
import { setActiveChannel } from '../../../../store/slices/uiSlice.js';
import badWordsDictionary from '../../../../utils/badWordsDictionary.js';
import channelNameSchema from './schema.js';

const AddChannelModal = () => {
  const { data: channels } = useGetChannelsQuery('');
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const addChannelInput = useRef(null);

  useEffect(() => {
    addChannelInput.current.focus();
  }, []);

  const [addChannel] = useAddChannelMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleSubmitForm = async ({ name: addChannelName }) => {
    const filteredChannelName = badWordsDictionary.clean(addChannelName.trim());

    try {
      const { name, id } = await addChannel(filteredChannelName).unwrap();
      toast.success(t('toast.channel.add'));
      dispatch(setActiveChannel({
        activeChannelId: id,
        activeChannelName: name,
      }));
    } catch (e) {
      toast.error(t('toast.errors.add'));
    }
    dispatch(closeModal());
  };

  return (
    <Formik
      initialValues={{ name: '' }}
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
              ref={addChannelInput}
              className="mb-2"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name && !!touched.name}
            />
            <Form.Label className="visually-hidden">
              {t('modal.addChannel.label')}
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
            <Button type="submit">
              {t('modal.buttons.submit')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddChannelModal;
