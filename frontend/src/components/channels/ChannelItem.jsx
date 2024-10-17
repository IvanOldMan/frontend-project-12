/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { actions as conditionActions } from '../../store/slices/conditionSlice.js';
import { actions as modalActions } from '../../store/slices/modalSlice.js';

const ChannelItem = ({ channel }) => {
  const { activeChannelId } = useSelector((state) => state.condition);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const variant = channel.id === activeChannelId ? 'secondary' : 'pills';

  const clickHandler = () => {
    dispatch(conditionActions.setActiveChannel({
      activeChannelId: channel.id,
      activeChannelName: channel.name,
    }));
  };

  const removeHandler = () => {
    dispatch(modalActions.removeChannelModal(channel.id));
  };

  const editHandler = () => {
    dispatch(modalActions.editChannelModal({
      id: channel.id,
      name: channel.name,
    }));
  };

  return (
    channel.removable
      ?
      (
        <Dropdown className="d-flex" as={ButtonGroup} role="group">
          <Button className="w-100 rounded-0 text-start text-truncate" variant={variant} onClick={clickHandler}>
            <span className="me-1">
              {t('channelsContainer.prefix')}
            </span>
            {channel.name}
          </Button>
          <Dropdown.Toggle variant={variant} split className="flex-grow-0">
            <span className="visually-hidden">Управление каналом</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={removeHandler}>Удалить</Dropdown.Item>
            <Dropdown.Item onClick={editHandler}>Переименовать</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>)
      :
      (
        <Button
          className="w-100 rounded-0 text-start"
          variant={variant}
          onClick={clickHandler}
        >
          <span className="me-1">
            {t('channelsContainer.prefix')}
          </span>
          {channel.name}
        </Button>)
  );
};

export default ChannelItem;
