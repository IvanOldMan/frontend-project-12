import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { selectIsShown, selectType } from '../../../store/slices/selectors.js';
import { closeModal } from '../../../store/slices/modalSlice.js';

const ModalContainer = ({ children }) => {
  const dispatch = useDispatch();
  const type = useSelector(selectType);
  const isShown = useSelector(selectIsShown);
  const { t } = useTranslation();

  const handleClose = () => {
    dispatch(closeModal());
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
          {t(`modal.${type}Channel.title`)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
