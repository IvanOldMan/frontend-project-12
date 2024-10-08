import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useEditChannelMutation } from "../../../store/API/channelsAPI";
import {actions as conditionActions} from '../../../store/slices/conditionSlice.js';
import Modal from "react-bootstrap/Modal";
import {Field, Form, Formik} from "formik";
import {actions as modalActions} from "../../../store/slices/modalSlice";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import leoProfanity from 'leo-profanity';

const EditChannelModal = () => {
  const { isShown, channelID, channelName } = useSelector((state) => state.modal);
  const { activeChannelId } = useSelector((state) => state.condition);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [
    editChannel,
    { error: editChannelError, isLoading: editAddingChannel },
  ] = useEditChannelMutation();

  const closeModalHandler = () => dispatch(modalActions.isModalOpen(false));



  return (
  <Modal
  show={isShown}
  onHide={closeModalHandler}
  aria-labelledby="contained-modal-title-vcenter"
  centered
  >
    <Modal.Header closeButton>
      <Modal.Title>
        Переименовать канал
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
      initialValues={{ name: channelName }}
      //validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        const newChannelName = values.name;
        const filteredNewName = leoProfanity.clean(newChannelName);
        const data = {id: channelID, name: filteredNewName}
        const response = await editChannel(data);
        const { id, name } = response.data;
        if (id === activeChannelId) {
          dispatch(conditionActions.setActiveChannel({
            activeChannelId: id,
            activeChannelName: name,
          }))
        }
        editChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.edit'));
        closeModalHandler();
      }}
      >
        {() => (
        <Form>
          <div>
            <Field id="name" name="name" className="mb-2 form-control"/>
            <label htmlFor="name" className="visually-hidden">Переименовать канал</label>
            <div className="invalid-feedback"></div>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={closeModalHandler}>
                Отменить
              </button>
              <button type="submit" className="btn btn-primary">
                Отправить
              </button>
            </div>
          </div>
        </Form>
        )}
      </Formik>

    </Modal.Body>
  </Modal>
  );
};

export default EditChannelModal;
