import React from 'react';
import ChannelsContainer from "../components/channels/ChannelsContainer";
import MessagesContainer from "../components/messages/MessagesContainer";
import ModalContainer from "../components/modals/ModalContainer";
import {ToastContainer} from "react-toastify";

const GeneralPage = () => {

  return (
    <div className="row h-100 bg-white flex-md-row">
      <ChannelsContainer />
      <MessagesContainer />
      <ModalContainer/>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default GeneralPage;
