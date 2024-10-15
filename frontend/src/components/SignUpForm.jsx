import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { authenticationRequest } from '../store/slices/authenticatedSlice';
import { signupSchema } from '../schema.js';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const usernameInput = useRef(null);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  return (
  <Formik
    initialValues={{ username: '', password: '', confirmPassword: '', }}
    validationSchema={signupSchema}
    onSubmit={async (values, { setErrors }) => {
      const { username, password } = values;
      const {payload} = await dispatch(authenticationRequest({ url:'/signup', username, password }));

      if (payload === 409) {
        setErrors({ username: ' ', password: ' ', confirmPassword: 'Такой пользователь уже существует' });
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
    <Form className="w-50" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">
        {t('signUpPage.title')}
      </h1>
      <FloatingLabel
        label={t('signUpPage.form.username')}
        className="mb-3"
      >
        <Form.Control
          ref={usernameInput}
          id="username"
          placeholder="username"
          autoComplete="username"
          required
          value={values.username}
          onChange={handleChange}
          isInvalid={!!errors.username && !!touched.username}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.username}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        label={t('signUpPage.form.password')}
        className="mb-3"
      >
        <Form.Control
          id="password"
          placeholder="Минимум 6 символов"
          aria-describedby="passwordHelpBlock"
          autoComplete="new-password"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
          isInvalid={!!errors.password && !!touched.password}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>

      <FloatingLabel
        label={t('signUpPage.form.confirmPassword')}
        className="mb-4"
      >
        <Form.Control
          id="confirmPassword"
          placeholder="username"
          autoComplete="new-password"
          type="password"
          required
          value={values.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword && !!touched.confirmPassword}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {errors.confirmPassword}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button
        type="submit"
        variant={'outline-primary'}
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
