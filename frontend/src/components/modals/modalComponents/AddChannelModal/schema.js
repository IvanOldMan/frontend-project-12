import * as Yup from 'yup';

const channelNameSchema = (channelsNames) => Yup.string()
  .trim()
  .min(3, 'От 3 до 20 символов')
  .max(20, 'От 3 до 20 символов')
  .required('обязательное поле')
  .notOneOf(channelsNames, 'Должно быть уникальным');

export default channelNameSchema;
