import React from 'react';
import { Card, Image } from 'react-bootstrap';
import SignUpForm from '../components/forms/SignUpForm';
import PageContainer from '../components/PageContainer';
import registrationImage from '../assets/images/registration.jpg';

const SignUpPage = () => (
  <PageContainer>
    <Card.Body className="p-5 d-flex flex-column flex-md-row justify-content-around align-items-center">
      <div>
        <Image src={registrationImage} roundedCircle alt="Регистрация" />
      </div>
      <SignUpForm />
    </Card.Body>
  </PageContainer>
);

export default SignUpPage;
