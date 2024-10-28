import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import path from '../../utils/routes.js';
import { useSignupMutation } from '../../store/API/authorizationAPI';
import { setAuthenticated } from '../../store/slices/authenticatedSlice';
import FormButton from '../../components/FormButton';
import signupSchema from './schema.js';

const SignupForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const usernameInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmitForm = async (values, { setErrors }) => {
    try {
      const data = await signup(values).unwrap();
      dispatch(setAuthenticated(data));
      navigate(path.pages.root());
    } catch (e) {
      setErrors({ username: ' ', password: ' ', confirmPassword: t(`errors.${e.status}`) });
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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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
          <FormButton
            isLoading={isLoading}
            text={t('signUpPage.button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
