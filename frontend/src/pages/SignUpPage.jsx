import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Image } from 'react-bootstrap';
import SignUpForm from '../components/forms/SignUpForm';
import PageContainer from '../components/PageContainer';
import registrationImage from '../assets/images/registration.jpg';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]); // eslint-disable-line

  return (
    <PageContainer>
      <Card.Body className="p-5 d-flex flex-column flex-md-row justify-content-around align-items-center">
        <div>
          <Image src={registrationImage} roundedCircle alt="Регистрация" />
        </div>
        <SignUpForm />
      </Card.Body>
    </PageContainer>
  );
};

export default SignUpPage;
