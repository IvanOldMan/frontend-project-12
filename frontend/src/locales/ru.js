export default {
  translation: {
    navBar: {
      title: 'Hexlet Chat',
      button: 'Выйти',
    },
    loginPage: {
      title: 'Вход',
      form: {
        username: 'Ваше имя',
        password: 'Пароль',
      },
      button: 'Войти',
      footer: {
        text: 'Нет аккаунта? ',
        signUpLink: 'Регистрация',
      }
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
      prefix: '# ',
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
        remove: 'Канал удалён'
      },
      errors: {
        network: 'Ошибка сети',
        loadingData: 'Ошибка загрузки',
      }
    }
  },
};
