import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/LoginPage.jsx';
import RootPage from './pages/RootPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import MyNavBar from './components/MyNavBar.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ModalContainer from './components/modals/ModalContainer.jsx';
import './App.css';

const App = () => (
  <>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<ErrorPage />} />
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
