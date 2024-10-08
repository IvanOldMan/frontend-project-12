import React from 'react';
import { useGetChannelsQuery } from '../../store/API/channelsAPI.js';
import ChannelItem from "./ChannelItem";
import { actions as modalActions } from "../../store/slices/modalSlice.js";
import { useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import MySpinner from "../MySpinner";
import Socket from "../../socket";
import {useTranslation} from "react-i18next";


const ChannelsContainer = () => {
  Socket.channels();

  const {data: channels, error, isLoading} = useGetChannelsQuery('');
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalHandler = () => {
    dispatch(modalActions.isModalOpen(true));
    dispatch(modalActions.setModalType('add'));
  };


  return (
  <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>
        {t('channelsContainer.title')}
      </b>
      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={modalHandler}>
        +
      </button>
    </div>
    {isLoading && <MySpinner />}
    {error && <h1>ошибка загрузки {error.message}</h1>}
    {channels &&  <Nav className="flex-column px-2 mb-3 overflow-auto h-100 d-block" as="ul" id="channels-box" variant='pills' fill={true}>
      {channels.map((channel) => {
        return <Nav.Item className="w-100" as="li" key={channel.id}>
          <ChannelItem
          channel={channel}
          key={channel.id}
          />
        </Nav.Item>
        })
      }
      </Nav>}
  </div>
  );
};

export default ChannelsContainer;
