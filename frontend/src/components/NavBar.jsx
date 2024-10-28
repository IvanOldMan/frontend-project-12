import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Navbar as BootstrapNavBar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { removeAuthenticated } from '../store/slices/authenticatedSlice.js';
import { selectIsAuth } from '../store/slices/selectors';

const NavBar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuth = useSelector(selectIsAuth);
  const MemoButton = memo(Button);

  const handleLogout = useCallback(() => {
    dispatch(removeAuthenticated());
  }, [dispatch]);

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
        {(isAuth && <MemoButton onClick={handleLogout}>{t('navBar.button')}</MemoButton>)}
      </Container>
    </BootstrapNavBar>
  );
};

export default NavBar;
