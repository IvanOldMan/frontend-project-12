import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useRemoveChannelMutation } from "../../../store/API/channelsAPI";
import {actions as modalActions} from "../../../store/slices/modalSlice";
import Modal from "react-bootstrap/Modal";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

const RemoveChannelModal = () => {
  const { isShown, channelID } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [
    removeChannel,
    { error: removeChannelError, isLoading: isAddingChannel },
  ] = useRemoveChannelMutation();

  const closeModalHandler = () => {
    dispatch(modalActions.isModalOpen(false));
    dispatch(modalActions.setChannelID(null));
  }

  const removeHandler = async () => {
    await removeChannel(channelID);
    removeChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.remove'));
    dispatch(modalActions.setChannelID(null));
    dispatch(modalActions.isModalOpen(false));
    dispatch(modalActions.setModalType(null));
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
              <button type="button" className="me-2 btn btn-secondary" onClick={closeModalHandler}>
                Отменить
              </button>
              <button type="submit" className="btn btn-danger" onClick={removeHandler}>
                Удалить
              </button>
            </div>

    </Modal.Body>
  </Modal>
  );
};

export default RemoveChannelModal;
