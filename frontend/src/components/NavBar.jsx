import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Navbar as BootstrapNavBar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as authenticatedActions } from '../store/slices/authenticatedSlice.js';
import selectors from '../store/slices/selectors';

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isHaveToken = !!useSelector(selectors.token);
  const MemoButton = memo(Button);

  const handleLogout = useCallback(() => {
    dispatch(authenticatedActions.removeAuthenticated());
  });

  return (
    <BootstrapNavBar
      expand="lg"
      bg="white"
      variant="light"
      className="shadow-sm"
    >
      <Container>
        <BootstrapNavBar.Brand href="/">
          {t('navBar.title')}
        </BootstrapNavBar.Brand>
        {(isHaveToken && <MemoButton onClick={handleLogout}>{t('navBar.button')}</MemoButton>)}
      </Container>
    </BootstrapNavBar>
  );
};

export default NavBar;
