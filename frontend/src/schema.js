import * as Yup from 'yup';

const channelNameSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('обязательное поле'),
});

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('обязательное поле'),
});

export { channelNameSchema, signupSchema };
