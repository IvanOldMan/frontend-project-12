import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actions as channelsActions, selectors} from '../store/slices/channelsSlice.js';
import Channel from "./Channel";
import AuthService from "../services/AuthService";
import {actions as messagesActions} from "../store/slices/messagesSlice";

const ChannelsBar = () => {
  /*
  const dispatch = useDispatch();
  const { username, isAuthenticated, error, loadingStatus } = useSelector(state => state.auth);
  useEffect(() => {

  }, []);

   */
  const channels = useSelector(selectors.selectAll);

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
      {channels.map((channel) => {
        return <Channel
          name={channel.name}
          key={channel.id}
        />})
      }
    </ul>
  </div>
  );
};

export default ChannelsBar;
