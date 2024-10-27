import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { useEditChannelMutation, useGetChannelsQuery } from '../../../store/API/channelsAPI';
import { actions as conditionActions } from '../../../store/slices/conditionSlice.js';
import { actions as modalActions } from '../../../store/slices/modalSlice';
import badWordsDictionary from '../../../utils/badWordsDictionary';
import selectors from '../../../store/slices/selectors';

const EditChannelModal = () => {
  const isShown = useSelector(selectors.isShownModal);
  const channelID = useSelector(selectors.channelIdModal);
  const channelName = useSelector(selectors.channelNameModal);
  const activeChannelId = useSelector(selectors.currentChannelID);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const editChannelInput = useRef(null);

  const channelNameSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, t('schema.username'))
      .max(20, t('schema.username'))
      .required(t('schema.required')),
  });

  useEffect(() => {
    editChannelInput.current.focus();
    editChannelInput.current.select();
  }, []);

  const filteredChannelName = badWordsDictionary.clean(channelName);

  const { data: channels } = useGetChannelsQuery('');
  const [editChannel] = useEditChannelMutation();

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleSubmitForm = async ({ name: newChannelName }, { setErrors }) => {
    const normalizedName = newChannelName.trim();
    const currentChannels = channels.map(({ name }) => name);

    if (!currentChannels.includes(normalizedName)) {
      try {
        const data = { id: channelID, name: normalizedName };
        const { id, name } = await editChannel(data).unwrap();
        toast.success(t('toast.channel.edit'));

        if (id === activeChannelId) {
          dispatch(conditionActions.setActiveChannel({
            activeChannelId: id,
            activeChannelName: name,
          }));
        }
      } catch (e) {
        toast.error(t('toast.errors.edit'));
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
          {t('modal.editChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={channelNameSchema}
          initialValues={{ name: filteredChannelName }}
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
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
