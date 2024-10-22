import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { authenticationRequest } from '../../store/slices/authenticatedSlice.js';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const usernameInput = useRef(null);

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('schema.username'))
      .max(20, t('schema.username'))
      .required(t('schema.required')),
    password: Yup.string()
      .min(6, t('schema.password'))
      .required(t('schema.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('schema.confirmPassword'))
      .required(t('schema.required')),
  });

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const handleSubmitForm = async ({ username, password }, { setErrors }) => {
    const { payload } = await dispatch(authenticationRequest({ url: '/signup', username, password }));

    if (payload === 409) {
      setErrors({ username: ' ', password: ' ', confirmPassword: t('schema.signupError') });
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={signupSchema}
      onSubmit={handleSubmitForm}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form className="w-50" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4">
            {t('signUpPage.title')}
          </h1>

          <Form.Floating className="mb-3">
            <Form.Control
              ref={usernameInput}
              id="username"
              name="username"
              placeholder={t('signUpPage.form.username')}
              autoComplete="username"
              required
              value={values.username}
              onChange={handleChange}
              isInvalid={!!errors.username && !!touched.username}
            />
            <Form.Label htmlFor="username">
              {t('signUpPage.form.username')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.username}
            </Form.Control.Feedback>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              id="password"
              name="password"
              type="password"
              aria-describedby="passwordHelpBlock"
              placeholder={t('signUpPage.form.password')}
              autoComplete="new-password"
              required
              value={values.password}
              onChange={handleChange}
              isInvalid={!!errors.password && !!touched.password}
            />
            <Form.Label htmlFor="password">
              {t('signUpPage.form.password')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Floating>

          <Form.Floating className="mb-4">
            <Form.Control
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={t('signUpPage.form.confirmPassword')}
              autoComplete="new-password"
              required
              value={values.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}
            />
            <Form.Label htmlFor="confirmPassword">
              {t('signUpPage.form.confirmPassword')}
            </Form.Label>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Floating>
          <Button
            type="submit"
            variant="outline-primary"
            className="w-100 mb-3"
          >
            {t('signUpPage.button')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
