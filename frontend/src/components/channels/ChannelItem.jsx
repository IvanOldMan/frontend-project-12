import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import cn from "classnames";
import { actions as conditionActions } from '../../store/slices/conditionSlice.js';
import { actions as modalActions } from '../../store/slices/modalSlice.js';
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import DropDown from "../DropDown";
import {useTranslation} from "react-i18next";

const ChannelItem = ({ channel }) => {
  const { activeChannelId } = useSelector((state) => state.condition);
  //const classList = cn("w-100 rounded-0 text-start");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const variant = channel.id === activeChannelId ? 'secondary' : 'pills';
  const clickHandler = () => {
    dispatch(conditionActions.setActiveChannel({
        activeChannelId: channel.id,
        activeChannelName: channel.name,
      })
    );
  }
  const removeHandler = () => {
    dispatch(modalActions.setChannelID(channel.id));
    dispatch(modalActions.isModalOpen(true));
    dispatch(modalActions.setModalType('remove'));
  }
  const editHandler = () => {
    dispatch(modalActions.setChannelID(channel.id));
    dispatch(modalActions.setChannelName(channel.name));
    dispatch(modalActions.isModalOpen(true));
    dispatch(modalActions.setModalType('edit'));
  }

  return (
    channel.removable
    ?
    <Dropdown className="w-100 rounded-0 text-start"  as={ButtonGroup} role="group">
      <Button variant={variant} onClick={clickHandler}>{t('channelsContainer.prefix')}{channel.name}</Button>

      <Dropdown.Toggle variant={variant} split id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={removeHandler}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={editHandler}>Изменить</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    :
    <Button className="w-100 rounded-0 text-start" variant={variant} onClick={clickHandler}># {channel.name}</Button>
  );
};

export default ChannelItem;
