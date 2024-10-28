import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../../store/API/channelsAPI.js';
import { closeModal } from '../../../store/slices/modalSlice';
import { setDefaultChannel } from '../../../store/slices/uiSlice';
import { selectID, selectChannelID } from '../../../store/slices/selectors';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelID = useSelector(selectID);
  const activeChannelId = useSelector(selectChannelID);

  const [removeChannel] = useRemoveChannelMutation();

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleRemove = async () => {
    try {
      await removeChannel(channelID).unwrap();
      toast.success(t('toast.channel.remove'));
      if (channelID === activeChannelId) {
        dispatch(setDefaultChannel());
      }
    } catch (e) {
      toast.error(t('toast.errors.remove'));
    }

    dispatch(closeModal());
  };

  return (
    <>
      <p className="lead">
        {t('modal.removeChannel.body')}
      </p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          onClick={handleClose}
        >
          {t('modal.buttons.close')}
        </Button>
        <Button
          type="submit"
          onClick={handleRemove}
          variant="danger"
        >
          {t('modal.buttons.remove')}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannelModal;
