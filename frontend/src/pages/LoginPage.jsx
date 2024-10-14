import React, {useEffect} from 'react';
import LoginForm from "../components/LoginForm";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { Button, Card, Col, Container, Row} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import loginImage from '../images/login.jpg';
import { useTranslation } from "react-i18next";
import PageContainer from "../components/PageContainer";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])

  return (
    <PageContainer>
      <Card.Body as={Row} className="p-5">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <Image src={loginImage} roundedCircle alt="Войти"/>
        </Col>
        <LoginForm/>
      </Card.Body>
      <Card.Footer className="p-4">
        <Container className="text-center">
          <span>
            {t('loginPage.footer.text')}
          </span>
          <a href="/signup">
            {t('loginPage.footer.signUpLink')}
          </a>
        </Container>
      </Card.Footer>
    </PageContainer>
  );
};

export default LoginPage;
