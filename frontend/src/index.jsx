import ReactDOM from 'react-dom/client';
import 'bootstrap';
import './index.css';
import './styles/styles.scss';
import init from './init.jsx';

const runApp = async () => {
  const chat = ReactDOM.createRoot(document.getElementById('chat'));
  chat.render(await init());
};

runApp();
