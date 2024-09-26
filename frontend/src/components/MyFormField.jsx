import React from 'react';
import {Field} from "formik";

const MyFormField = ({name, text, autoComplete}) => {
  return (
    <div className="form-floating mb-3">
      <Field
        id={name}
        type={name}
        name={name}
        autoComplete={autoComplete}
        className="form-control"
        placeholder={text}
        required
      />
      <label htmlFor={name}>
        {text}
      </label>
    </div>
  );
};

export default MyFormField;