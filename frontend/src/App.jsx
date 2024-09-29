import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import React, {useEffect} from "react";
import {useSelector} from 'react-redux';

function App() {
  const isAuth = useSelector((state) => state.authentication.isAuthenticated);
  const username = useSelector((state) => state.authentication.username);
  //console.log(isAuth)

  const currentToken = localStorage.getItem('token');
  const startPage = currentToken ? <RootPage/> : <LoginPage />;


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={startPage} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
