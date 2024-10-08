import i18next from 'i18next';
import io from 'socket.io-client';
import resources from './locales/index';
import {initReactI18next} from "react-i18next";


// Начальная функция
export default async () => {
  // создание экземпляра i18next
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      debug: true,
      resources,
      }
    );

  // создание сокета
  //const socket = new io();
  //socket.on(/* настройка вебсокетов */);

  //const form = document.querySelector('some-form');
  //form.addEventListener('submit', (e) => {
    // А вот тут логика приложения, ее можно вынести в отдельную функцию или несколько функций в отдельном модуле
    // где-то в таких обработчиках используется state и socket
 // });
};
