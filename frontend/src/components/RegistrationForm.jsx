import React from 'react';
import {useDispatch} from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyFormField from './MyFormField';
import loginImage from '../images/login.jpg';
import { authenticationRequest } from '../store/slices/authenticatedSlice.js';
import {useTranslation} from "react-i18next";

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
  const { t } = useTranslation();


  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
          dispatch(authenticationRequest({...values, url: '/login'}));
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
                {t('loginPage.title')}
              </h1>
              <MyFormField
                name="username"
                text={t('loginPage.form.username')}
                autoComplete="username"
                initialClass="mb-3"
              />
              <MyFormField
                name="password"
                text={t('loginPage.form.password')}
                autoComplete="password"
                initialClass="mb-4"
              />

              <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                {t('loginPage.button')}
              </button>
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>
                {t('loginPage.footer.text')}
              </span>
              <a href="/signup">
                {t('loginPage.footer.signUpLink')}
              </a>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegistrationForm;
