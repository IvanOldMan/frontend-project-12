import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as authenticatedActions } from '../store/slices/authenticatedSlice.js';

const MyNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isHaveToken = !!localStorage.getItem('AUTH_TOKEN');

  const outHandler = () => {
    localStorage.clear();
    dispatch(authenticatedActions.setAuthenticated(false));
    navigate('/login');
  };
  return (
    <Navbar
      expand="lg"
      bg="white"
      variant="light"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand href="/">
          {t('navBar.title')}
        </Navbar.Brand>
        {(isHaveToken && <Button onClick={outHandler}>{t('navBar.button')}</Button>)}
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
