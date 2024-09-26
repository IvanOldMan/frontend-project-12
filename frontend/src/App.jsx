import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import React, {useState} from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RootPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
