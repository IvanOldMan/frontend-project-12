import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../../store/API/channelsAPI.js';
import { useGetMessagesQuery, useRemoveMessageMutation } from '../../../store/API/messagesAPI.js';
import { actions as modalActions } from '../../../store/slices/modalSlice';
import { actions as conditionActions } from '../../../store/slices/conditionSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isShown, channelID } = useSelector((state) => state.modal);
  const {
    activeChannelId,
    defaultChannelId,
    defaultChannelName,
  } = useSelector((state) => state.condition);

  const { data: messages } = useGetMessagesQuery('');

  const [
    removeChannel,
    { error: removeChannelError },
  ] = useRemoveChannelMutation();

  const [removeMessage] = useRemoveMessageMutation();

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  };

  const removeHandler = async () => {
    await removeChannel(channelID);
    messages.filter(({ curChannelID }) => curChannelID === activeChannelId)
      .forEach(({ id }) => removeMessage(id));
    removeChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.remove'));
    if (channelID === activeChannelId) {
      dispatch(conditionActions.setActiveChannel({
        activeChannelId: defaultChannelId,
        activeChannelName: defaultChannelName,
      }));
    }
    dispatch(modalActions.closeModal());
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
          {t('modal.removeChannel.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('modal.removeChannel.body')}
        </p>
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
            onClick={removeHandler}
            variant="danger"
          >
            {t('modal.buttons.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
