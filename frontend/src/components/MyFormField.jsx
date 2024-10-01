import React from 'react';
import {Field} from "formik";
import cn from 'classnames'
import {useSelector} from "react-redux";

const MyFormField = ({name, text, autoComplete, initialClass}) => {
  const { error } = useSelector((state) => state.authentication);
  const classList = cn({
    "form-control": true,
    "is-invalid": !!error,
  });

  return (
    <div className={`form-floating ${initialClass}`}>
      <Field
        id={name}
        type={name}
        name={name}
        autoComplete={autoComplete}
        className={classList}
        placeholder={text}
        required
      />
      <label htmlFor={name}>
        {text}
      </label>
      {!!error && name === "password" && <div className="invalid-tooltip">
        Неверные имя пользователя или пароль
      </div>}
    </div>
  );
};

export default MyFormField;
