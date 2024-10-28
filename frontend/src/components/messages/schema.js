import * as Yup from 'yup';

const messageSchema = Yup.object().shape({
  body: Yup.string()
    .trim()
    .required(),
});

export default messageSchema;
