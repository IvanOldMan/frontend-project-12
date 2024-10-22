import React from 'react';
import { useSelector } from 'react-redux';
import AddChannelModal from './modalComponents/AddChannelModal';
import RemoveChannelModal from './modalComponents/RemoveChannelModal';
import EditChannelModal from './modalComponents/EditChannelModal';

const modalComponents = {
  add: <AddChannelModal />,
  edit: <EditChannelModal />,
  remove: <RemoveChannelModal />,
  // eslint-disable-next-line
  close: (<></>),
};

const ModalContainer = () => {
  const { type } = useSelector((state) => state.modal);

  return (
    // eslint-disable-next-line
    <>
      {modalComponents[type]}
    </>
  );
};

export default ModalContainer;
