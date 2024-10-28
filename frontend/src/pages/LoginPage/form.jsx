import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import path from '../../utils/routes.js';
import { useLoginMutation } from '../../store/API/authorizationAPI';
import { setAuthenticated } from '../../store/slices/authenticatedSlice';
import FormButton from '../../components/FormButton';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const usernameInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmitForm = async (values, { setErrors }) => {
    try {
      const data = await login(values).unwrap();
      dispatch(setAuthenticated(data));
      navigate(path.pages.root());
    } catch (e) {
      setErrors({ form: t(`errors.${e.status}`) });
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSubmitForm}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        isValid,
      }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {t('loginPage.title')}
          </h1>
          <Form.Floating className="mb-3">
            <Form.Control
              ref={usernameInput}
              id="username"
              name="username"
              placeholder={t('loginPage.form.username')}
              autoComplete="username"
              required
              disabled={isLoading}
              value={values.username}
              onChange={handleChange}
              isInvalid={!isValid}
            />
            <Form.Label htmlFor="username">
              {t('loginPage.form.username')}
            </Form.Label>
          </Form.Floating>

          <Form.Floating className="mb-4">
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder={t('loginPage.form.password')}
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={values.password}
              onChange={handleChange}
              isInvalid={!isValid}
            />
            <Form.Label htmlFor="password">
              {t('loginPage.form.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.form}
            </Form.Control.Feedback>
          </Form.Floating>
          <FormButton
            isLoading={isLoading}
            text={t('loginPage.button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
