import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditChannelMutation, useGetChannelsQuery} from '../../../store/API/channelsAPI';
import { actions as conditionActions} from '../../../store/slices/conditionSlice.js';
import { Formik} from 'formik';
import { actions as modalActions } from '../../../store/slices/modalSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { Button, Form, Modal } from 'react-bootstrap';
import { channelNameSchema } from '../../../schema.js'


const EditChannelModal = () => {
  const { isShown, channelID, channelName } = useSelector((state) => state.modal);
  const {data: channels, error, isLoading} = useGetChannelsQuery('');
  const { activeChannelId } = useSelector((state) => state.condition);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const editChannelInput = useRef(null);

  useEffect(() => {
    editChannelInput.current.focus();
  }, []);

  const [
    editChannel,
    { error: editChannelError, isLoading: editAddingChannel },
  ] = useEditChannelMutation();

  const closeModalHandler = () => dispatch(modalActions.closeModal());

  return (
  <Modal
  show={isShown}
  onHide={closeModalHandler}
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
    <Modal.Header closeButton>
      <Modal.Title>
        Переименовать канал
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
        validationSchema={channelNameSchema}
        initialValues={{ name: channelName }}
        onSubmit={async (values, { setErrors }) => {
          const newChannelName = values.name;
          const a = channels.map(({name}) => name);
          if (a.includes(newChannelName)) {
            setErrors({name: 'Должно быть уникальным'});
          } else {
            const filteredNewName = leoProfanity.clean(newChannelName);
            const data = {id: channelID, name: filteredNewName}
            const response = await editChannel(data);
            const { id, name } = response.data;
            if (id === activeChannelId) {
              dispatch(conditionActions.setActiveChannel({
                activeChannelId: id,
                activeChannelName: name,
              }))
            }
            editChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.edit'));
            closeModalHandler();
          }
        }}
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
            <Form.Label className="visually-hidden">Переименовать канал</Form.Label>
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModalHandler}>Отменить</Button>
            <Button type="submit">Отправить</Button>
          </div>
        </Form>
        )}
      </Formik>
    </Modal.Body>
  </Modal>
  );
};

export default EditChannelModal;
