import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as authenticatedActions } from '../store/slices/authenticatedSlice.js';
import LocalStorage from '../utils/LocalStorageAdapter.js';

const MyNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const MemoButton = memo(Button);

  const handleLogout = useCallback(() => {
    LocalStorage.clear();
    dispatch(authenticatedActions.setAuthenticated(false));
    navigate('/login');
  }, []);

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
        {(LocalStorage.isHaveToken() && <MemoButton onClick={handleLogout}>{t('navBar.button')}</MemoButton>)}
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
