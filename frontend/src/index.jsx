import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  './styles/styles.scss';
import  'bootstrap';
import store from './store/store.js';
import { Provider } from 'react-redux';
import runApp from './init.js';
import {I18nextProvider, initReactI18next} from "react-i18next";
import i18next from "i18next";
import resources from "./locales/index";
import {Provider as RollbarProvider, ErrorBoundary} from "@rollbar/react";
import rollbarConfig from './rollbarConfig.js'

//runApp();
const i18n = i18next.createInstance();

await i18n
.use(initReactI18next)
.init({
  fallbackLng: 'ru',
  debug: true,
  resources,
}
);
const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>,
);

reportWebVitals();
