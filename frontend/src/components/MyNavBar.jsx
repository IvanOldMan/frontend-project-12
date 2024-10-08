import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {actions as authenticatedActions} from "../store/slices/authenticatedSlice.js";
import logo from "../images/Hexlet-logo.png";
import {useTranslation} from "react-i18next";
import {Container} from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

const MyNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isHaveToken = !!localStorage.getItem('AUTH_TOKEN');

  const outHandler = () => {
    localStorage.clear();
    dispatch(authenticatedActions.setAuthenticated(false));
    navigate('/login');
  }
  return (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Container>
      <Navbar.Brand href="/">

        {t('navBar.title')}
      </Navbar.Brand>
    </Container>
    {isHaveToken && <button className="btn btn-primary" type="button" onClick={outHandler}>
      {t('navBar.button')}
    </button>}
  </nav>
  );
};

export default MyNavBar;
