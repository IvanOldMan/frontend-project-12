import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import 'bootstrap';
import './assets/styles.scss';
import initApp from './init';

const runApp = async () => {
  const socket = io();
  const app = await initApp(socket);

  const chat = ReactDOM.createRoot(document.getElementById('chat'));
  chat.render(<React.StrictMode>{app}</React.StrictMode>);
};

runApp();
