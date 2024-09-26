import React from 'react';
import {Field, Form, Formik} from "formik";

const RegistrationForm = () => {
  return (
  <Formik
  initialValues={{ email: "", password: "" }}
  onSubmit={({ setSubmitting }) => {
    console.log("Form is validated! Submitting the form...");
    setSubmitting(false);
  }}
  >
    {() => (
    <Form>
      <div className="form-floating mb-3">
        <label htmlFor="username">Войти</label>
        <Field
        id="username"
        type="username"
        name="username"
        autoComplete="username"
        className="form-control"
        placeholder="Ваш ник"
        required
        />
        <Field
        type="password"
        name="password"
        className="form-control"
        placeholder="Пароль"
        />
        <button type="submit" className='w-100 mb-3 btn btn-outline-primary'>Войти</button>
      </div>
    </Form>
    )}
  </Formik>
  );
};

export default RegistrationForm;
