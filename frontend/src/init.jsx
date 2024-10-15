import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import App from './App.jsx';
import resources from './locales/index.js';
import rollbarConfig from './rollbarConfig.js';
import webSocketInit from './socket.js';

const init = async () => {
  // создание экземпляра i18next
  const i18n = i18next.createInstance();

  await i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    resources,
  });
  // создание экземпляра Socket.io
  webSocketInit();


  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

reportWebVitals();

export default init;

