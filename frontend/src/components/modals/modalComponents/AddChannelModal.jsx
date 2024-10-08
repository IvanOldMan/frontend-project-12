import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from "react-redux";
import {actions as modalActions} from "../../../store/slices/modalSlice.js";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {useAddChannelMutation} from "../../../store/API/channelsAPI";
import {actions as conditionActions} from "../../../store/slices/conditionSlice";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import leoProfanity from 'leo-profanity';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
  .min(3, '')
  .max(20, '')
  .required('')
});

const AddChannelModal = () => {
  const { activeChannelId, activeChannelName } = useSelector((state) => state.condition);
  const { isShown } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [
    addChannel,
    { error: addChannelError, isLoading: isAddingChannel },
  ] = useAddChannelMutation();

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
        Добавить канал
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
      initialValues={{ name: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        const channelName = values.name;
        const filteredChannelName = leoProfanity.clean(channelName);
        console.log('fn', typeof filteredChannelName);
        const response = await addChannel(filteredChannelName);
        addChannelError ? toast.error(t('toast.errors.loadingData')) : toast.success(t('toast.channel.add'));
        console.log('add', response.data)
        const { name, id } = response.data;
        dispatch(conditionActions.setActiveChannel({
          activeChannelId: id,
          activeChannelName: name,
        })
        );
        closeModalHandler();

      }}
      >
        {() => (
        <Form>
          <div>
            <Field id="name" name="name" className="mb-2 form-control"/>
            <label htmlFor="name" className="visually-hidden">Имя канала</label>
            <div className="invalid-feedback"></div>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={closeModalHandler}>
                Отменить
              </button>
              <button type="submit" className="btn btn-primary">
                Добавить
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

export default AddChannelModal;
