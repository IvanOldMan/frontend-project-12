import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAddChannelMutation, useGetChannelsQuery } from '../../../store/API/channelsAPI.js';
import { actions as modalActions } from '../../../store/slices/modalSlice.js';
import { actions as conditionActions } from '../../../store/slices/conditionSlice.js';

const AddChannelModal = () => {
  const { data: channels } = useGetChannelsQuery('');
  const { isShown } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const addChannelInput = useRef(null);

  const channelNameSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('schema.username'))
      .max(20, t('schema.username'))
      .required(t('schema.required')),
  });

  useEffect(() => {
    addChannelInput.current.focus();
  }, []);

  const [addChannel] = useAddChannelMutation();

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleSubmitForm = async ({ name: addChannelName }, { setErrors }) => {
    const normalizedName = addChannelName.trim();
    const currentChannels = channels.map(({ name }) => name);
    if (!currentChannels.includes(normalizedName)) {
      try {
        const { name, id } = await addChannel(normalizedName).unwrap();
        toast.success(t('toast.channel.add'));
        dispatch(conditionActions.setActiveChannel({
          activeChannelId: id,
          activeChannelName: name,
        }));
      } catch (e) {
        toast.error(t('toast.errors.add'));
      }
      dispatch(modalActions.closeModal());
    } else {
      setErrors({ name: t('modal.error') });
    }
  };

  return (
    <Modal
      show={isShown}
      onHide={handleClose}
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
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
