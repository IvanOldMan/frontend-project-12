import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import leoProfanity from 'leo-profanity';
import { useEditChannelMutation, useGetChannelsQuery } from '../../../store/API/channelsAPI';
import { actions as conditionActions } from '../../../store/slices/conditionSlice.js';
import { actions as modalActions } from '../../../store/slices/modalSlice';
import { channelNameSchema } from '../../../utils/schema.js';

const EditChannelModal = () => {
  const { isShown, channelID, channelName } = useSelector((state) => state.modal);
  const { data: channels } = useGetChannelsQuery('');
  const { activeChannelId } = useSelector((state) => state.condition);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const editChannelInput = useRef(null);

  useEffect(() => {
    editChannelInput.current.focus();
    editChannelInput.current.select();
  }, []);

  const [
    editChannel,
    { error: editChannelError },
  ] = useEditChannelMutation();

  const closeModalHandler = () => dispatch(modalActions.closeModal());

  const submitHandler = async (values, { setErrors }) => {
    const newChannelName = values.name;
    const currentChannels = channels.map(({ name }) => name);
    if (currentChannels.includes(newChannelName)) {
      setErrors({ name: t('modal.error') });
    } else {
      const filteredNewName = leoProfanity.clean(newChannelName);
      const data = { id: channelID, name: filteredNewName };
      const response = await editChannel(data);
      const { id, name } = response.data;
      if (id === activeChannelId) {
        dispatch(conditionActions.setActiveChannel({
          activeChannelId: id,
          activeChannelName: name,
        }));
      }
      // eslint-disable-next-line
      editChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.edit'));
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
          {t('modal.editChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={channelNameSchema}
          initialValues={{ name: channelName }}
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

export default EditChannelModal;
