import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './modalComponents/AddChannelModal';
import RemoveChannelModal from './modalComponents/RemoveChannelModal';
import EditChannelModal from './modalComponents/EditChannelModal';
import selectors from '../../store/slices/selectors.js';

const ModalContainer = () => {
  const type = useSelector(selectors.modalType);
  const modalComponents = {
    add: <AddChannelModal />,
    edit: <EditChannelModal />,
    remove: <RemoveChannelModal />,
    close: null,
  };

  return modalComponents[type];
};

export default ModalContainer;
