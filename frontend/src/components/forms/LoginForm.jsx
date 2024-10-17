import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { authenticationRequest } from '../../store/slices/authenticatedSlice.js';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const usernameInput = useRef(null);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const { username, password } = values;
        const { payload } = await dispatch(authenticationRequest({ url: '/login', username, password }));
        if (payload === 401) {
          setErrors({ username: '', password: 'Неверные имя пользователя или пароль' });
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
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
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.password && !!touched.password}
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
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password && !!touched.password}
            />
            <Form.Label htmlFor="password">
              {t('loginPage.form.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Floating>
          <Button variant="outline-primary" className="w-100 mb-3" type="submit">
            {t('loginPage.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
