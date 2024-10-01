import './App.css';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import React, {useEffect} from "react";
import {useSelector} from 'react-redux';
import NavBar from "./components/NavBar";

function App() {
  const isAuth = useSelector((state) => state.authentication.isAuthenticated);
  const username = useSelector((state) => state.authentication.username);

  return (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </div>

  );
}

export default App;
