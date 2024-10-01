import React from 'react';
import { useGetChannelsQuery } from '../store/slices/channelsSlice.js';
import ChannelItem from "./ChannelItem";

const ChannelsContainer = () => {
  const {data: channels, error, isLoading} = useGetChannelsQuery('');

  return (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>
        Каналы
      </b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical">
        +
      </button>
    </div>
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {isLoading && <h1>идёт загрузка...</h1>}
      {error && <h1>ошибка загрузки {error.message}</h1>}
      {channels && channels.map((channel) => {
        return <ChannelItem
          channel={channel}
          key={channel.id}
        />})
      }
    </ul>
  </div>
  );
};

export default ChannelsContainer;
