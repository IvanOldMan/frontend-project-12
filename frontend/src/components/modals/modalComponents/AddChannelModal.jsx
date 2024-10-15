import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import {useAddChannelMutation, useGetChannelsQuery} from '../../../store/API/channelsAPI.js';
import { actions as modalActions } from '../../../store/slices/modalSlice.js';
import { actions as conditionActions } from '../../../store/slices/conditionSlice.js';
import { channelNameSchema } from '../../../schema.js'
import { channelApi } from '../../../store/API/channelsAPI.js';

const AddChannelModal = () => {
  const {data: channels, error, isLoading} = useGetChannelsQuery('');
  const { isShown } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const addChannelInput = useRef(null);

  useEffect(() => {
    addChannelInput.current.focus();
  }, []);

  const [
    addChannel,
    { error: addChannelError },
  ] = useAddChannelMutation();

  const closeModalHandler = () => dispatch(modalActions.closeModal());

  const submitHandler = async (values, {setErrors}) => {
    const channelName = values.name;
    const a = channels.map(({name}) => name);
    if (a.includes(channelName)) {
      setErrors({name: t('modal.error')});
    } else {
      const filteredChannelName = leoProfanity.clean(channelName);
      const response = await addChannel(filteredChannelName);
      addChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.add'));
      const { name, id } = response.data;
      dispatch(conditionActions.setActiveChannel({
        activeChannelId: id,
        activeChannelName: name,
      }));
      closeModalHandler();
    }
  };

  return (
    <Modal
      show={isShown}
      onHide={closeModalHandler}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modal.addChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={channelNameSchema}
          onSubmit={submitHandler}
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
                <Form.Label
                  className="visually-hidden"
                >
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
                  onClick={closeModalHandler}
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
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
