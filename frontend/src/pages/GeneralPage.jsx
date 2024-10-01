import React from 'react';
import ChannelsBar from "../components/ChannelsBar";
import MessagesBar from "../components/MessagesBar";

const GeneralPage = () => {
  return (
    <div className="row h-100 bg-white flex-md-row">
      <ChannelsBar />
      <MessagesBar />
    </div>
  );
};

export default GeneralPage;
