import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  Col,
  Container,
  Row,
  Image,
} from 'react-bootstrap';
import PageContainer from '../components/PageContainer.jsx';
import LoginForm from '../components/forms/LoginForm.jsx';
import loginImage from '../assets/images/login.jpg';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Card.Body as={Row} className="p-5">
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
          <Image src={loginImage} roundedCircle alt="Войти" />
        </Col>
        <LoginForm />
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
