import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRemoveChannelMutation } from "../../../store/API/channelsAPI";
import { actions as modalActions } from "../../../store/slices/modalSlice";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { actions as conditionActions } from "../../../store/slices/conditionSlice";
import {useGetMessagesQuery, useRemoveMessageMutation} from "../../../store/API/messagesAPI";
import {Button} from "react-bootstrap";

const RemoveChannelModal = () => {
  const { isShown, channelID } = useSelector((state) => state.modal);
  const { activeChannelId, defaultChannelId, defaultChannelName } = useSelector((state) => state.condition);
  const {data: messages, error, isLoading} = useGetMessagesQuery('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [
    removeChannel,
    { error: removeChannelError, isLoading: isChannelRemoved },
  ] = useRemoveChannelMutation();

  const [
    removeMessage,
    { error: removeMessageError, isLoading: isMessageRemoved },
  ] = useRemoveMessageMutation();

  const closeModalHandler = () => {
    dispatch(modalActions.closeModal());
  }

  const removeHandler = async () => {
    await removeChannel(channelID);
    messages.filter(({ channelID }) => channelID === activeChannelId).forEach(({ id }) => removeMessage(id))
    removeChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.remove'));
    if (channelID === activeChannelId) {
      dispatch(conditionActions.setActiveChannel({
        activeChannelId: defaultChannelId,
        activeChannelName: defaultChannelName,
      }))
    }

    dispatch(modalActions.closeModal());
  }

  return (
  <Modal
    show={isShown}
    onHide={closeModalHandler}
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>
        Удалить канал
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end">
        <Button
        className="me-2"
        variant="secondary"
        onClick={closeModalHandler}
        >
          Отменить
        </Button>
        <Button
        type="submit"
        onClick={removeHandler}
        >
          Отправить
        </Button>
      </div>
    </Modal.Body>
  </Modal>
  );
};

export default RemoveChannelModal;
