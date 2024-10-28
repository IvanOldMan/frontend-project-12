import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './modalComponents/AddChannelModal';
import RemoveChannelModal from './modalComponents/RemoveChannelModal';
import EditChannelModal from './modalComponents/EditChannelModal';
import { selectType } from '../../store/slices/selectors.js';
import ModalContainer from './modalComponents/ModalContainer.jsx';

const modalComponents = {
  add: <AddChannelModal />,
  edit: <EditChannelModal />,
  remove: <RemoveChannelModal />,
};

const Modal = () => {
  const type = useSelector(selectType);
  const body = modalComponents[type];

  return (
    body && <ModalContainer>{body}</ModalContainer>
  );
};

export default Modal;
