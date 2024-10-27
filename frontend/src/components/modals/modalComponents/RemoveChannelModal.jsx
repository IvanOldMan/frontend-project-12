import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../../store/API/channelsAPI.js';
import { useGetMessagesQuery, useRemoveMessageMutation } from '../../../store/API/messagesAPI.js';
import { actions as modalActions } from '../../../store/slices/modalSlice';
import { actions as conditionActions } from '../../../store/slices/conditionSlice';
import selectors from '../../../store/slices/selectors';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isShown = useSelector(selectors.isShownModal);
  const channelID = useSelector(selectors.channelIdModal);
  const activeChannelId = useSelector(selectors.currentChannelID);

  const { data: messages } = useGetMessagesQuery('');

  const [removeChannel] = useRemoveChannelMutation();
  const [removeMessage] = useRemoveMessageMutation();

  const handleClose = () => {
    dispatch(modalActions.closeModal());
  };

  const handleRemove = async () => {
    try {
      await removeChannel(channelID).unwrap();
      toast.success(t('toast.channel.remove'));
      if (channelID === activeChannelId) {
        dispatch(conditionActions.setDefaultChannel());
      }
    } catch (e) {
      toast.error(t('toast.errors.remove'));
    }

    messages.filter(({ curChannelID }) => curChannelID === activeChannelId)
      .forEach(({ id }) => removeMessage(id));

    dispatch(modalActions.closeModal());
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
            onClick={handleClose}
          >
            {t('modal.buttons.close')}
          </Button>
          <Button
            type="submit"
            onClick={handleRemove}
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
