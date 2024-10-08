import React from 'react';
import {useDispatch} from "react-redux";
import {Form, Formik} from "formik";
import loginImage from "../images/registration.jpg";
import MyFormField from "./MyFormField";
import * as Yup from "yup";
import {authenticationRequest} from "../store/slices/authenticatedSlice";
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

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();


  return (
  <Formik
  initialValues={{ username: '', password: '', confirmPassword: '', }}
  validationSchema={SignupSchema}
  onSubmit={(values) => {
    const {confirmPassword, ...rest} = values;
    dispatch(authenticationRequest({ url:'/signup', ...rest }));
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
            {t('signUpPage.title')}
          </h1>
          <MyFormField
          name="username"
          text={t('signUpPage.form.username')}
          autoComplete="username"
          initialClass="mb-3"
          />
          <MyFormField
          name="password"
          text={t('signUpPage.form.password')}
          autoComplete="password"
          initialClass="mb-4"
          />
          <MyFormField
          name="confirmPassword"
          text={t('signUpPage.form.confirmPassword')}
          autoComplete="password"
          initialClass="mb-4"
          />

          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            {t('signUpPage.button')}
          </button>
        </Form>
      </div>
    </div>
    )}
  </Formik>
  );
};

export default SignUpForm;
