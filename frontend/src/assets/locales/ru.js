export default {
  translation: {
    navBar: {
      title: 'Hexlet Chat',
      button: 'Выйти',
    },
    loginPage: {
      title: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
      },
      button: 'Войти',
      footer: {
        text: 'Нет аккаунта? ',
        signUpLink: 'Регистрация',
      },
    },
    errorPage: {
      title: 'Страница не найдена',
      alt: 'Страница не найдена',
      body: {
        text: 'Но вы можете перейти ',
        link: 'на главную страницу',
      },
    },
    signUpPage: {
      title: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
      },
      button: 'Зарегистрироваться',
    },
    channelsContainer: {
      title: 'Каналы',
      prefix: '#',
    },
    messagesContainer: {
      messageCount: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
      button: 'Отправить',
      form: {
        placeholder: 'Введите сообщение...',
        label: 'Новое сообщение',
      },
    },
    toast: {
      channel: {
        add: 'Канал создан',
        edit: 'Канал переименован',
        remove: 'Канал удалён',
      },
      errors: {
        add: 'При создании канала произошла ошибка',
        edit: 'При переименовании канала произошла ошибка',
        remove: 'При удалении канала произошла ошибка',
      },
    },
    schema: {
      username: 'От 3 до 20 символов',
      required: 'обязательное поле',
      password: 'Не менее 6 символов',
      confirmPassword: 'Пароли должны совпадать',
      signupError: 'Такой пользователь уже существует',
      loginError: 'Неверные имя пользователя или пароль',
    },
    modal: {
      addChannel: {
        title: 'Добавить канал',
        label: 'Имя канала',
      },
      editChannel: {
        title: 'Переименовать канал',
        label: 'Имя канала',
      },
      removeChannel: {
        title: 'Удалить канал',
        body: 'Уверены?',
      },
      buttons: {
        close: 'Отменить',
        submit: 'Отправить',
        remove: 'Удалить',
      },
      error: 'Должно быть уникальным',
    },
  },
};
