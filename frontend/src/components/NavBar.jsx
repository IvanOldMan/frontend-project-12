import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {actions as authenticatedActions} from "../store/slices/authenticatedSlice.js";
import logo from "../images/Hexlet-logo.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.authentication.isAuthenticated);

  const outHandler = () => {
    localStorage.removeItem("token");
    dispatch(authenticatedActions.setUsername(''));
    dispatch(authenticatedActions.setAuthenticated(false));
    navigate('/login');
  }
  return (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
          {isAuth && <button className="btn btn-primary" type="button" onClick={outHandler}>Выйти</button>}
    </div>
  </nav>
  );
};

export default NavBar;
