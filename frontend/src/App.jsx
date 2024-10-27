import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import NavBar from './components/NavBar.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ModalContainer from './components/modals/ModalContainer.jsx';
import path from './utils/routes.js';
import PrivateRout from './components/PrivateRout';
import ChatPage from './pages/ChatPage';

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path={path.pages.root()}
            element={(
              <PrivateRout>
                <ChatPage />
              </PrivateRout>
            )}
          />
          <Route path={path.pages.login()} element={<LoginPage />} />
          <Route path={path.pages.signup()} element={<SignUpPage />} />
          <Route path={path.pages.other()} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <ModalContainer />
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

export default App;
