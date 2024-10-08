import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import React from "react";
import MyNavBar from "./components/MyNavBar";
import SignUpPage from "./pages/SignUpPage";

function App() {

  return (
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
  </div>

  );
}

export default App;
