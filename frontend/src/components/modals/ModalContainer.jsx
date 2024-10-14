import React from 'react';
import AddChannelModal from "./modalComponents/AddChannelModal";
import RemoveChannelModal from "./modalComponents/RemoveChannelModal";
import EditChannelModal from "./modalComponents/EditChannelModal";
import {useSelector} from "react-redux";

const modalComponents = {
  add: <AddChannelModal />,
  edit: <EditChannelModal />,
  remove: <RemoveChannelModal />,
};

const ModalContainer = () => {
  const { type } = useSelector((state) => state.modal);

  return (
  <>
    {modalComponents[type]}
  </>
  );
};

export default ModalContainer;
