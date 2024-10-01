import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyFormField from './MyFormField';
import loginImage from '../images/login.jpg';
import AuthService from '../services/AuthService.js';
import { actions as authenticatedActions } from '../store/slices/authenticatedSlice.js';
import { actions as channelsActions } from '../store/slices/channelsSlice.js';
import { actions as messagesActions } from '../store/slices/messagesSlice.js';
import { authenticationRequest } from '../store/slices/authenticatedSlice.js';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required(''),
  password: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(20, 'Максимум 20 символов')
    .required(''),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(authenticationRequest(values));
        if (!!localStorage.getItem('token')) {
          navigate('/');
        }
        /*
        try {
          const { token, username } = await AuthService.login(values);
          localStorage.setItem('token', token);
          dispatch(authenticatedActions.setUsername(username));
          dispatch(authenticatedActions.setAuthenticated(true));
          const channels = await AuthService.getChannels();
          const messages = await AuthService.getMessages();
          dispatch(channelsActions.addChannels(channels));
          dispatch(messagesActions.addMessages(messages));

        } catch (e) {
          throw new Error(e)
        }

         */
      }}
    >
      {() => (
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img src={loginImage} className="rounded-circle" alt="Войти" />
            </div>

            <Form className="col-12 col-md-6 mt-3 mt-md-0">
              <h1 className="text-center mb-4">
                Войти
              </h1>
              <MyFormField
                name="username"
                text="Пароль"
                autoComplete="current-password"
                initialClass="mb-3"
              />
              <MyFormField
                name="password"
                text="Ваше имя"
                autoComplete="username"
                initialClass="mb-4"
              />

              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>
                Нет аккаунта?
              </span>
              <a href="/register">
                Регистрация
              </a>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegistrationForm;
