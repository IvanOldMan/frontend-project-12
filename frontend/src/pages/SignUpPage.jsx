import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import PageContainer from "../components/PageContainer";
import {Card, Col, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import registrationImage from '../images/registration.jpg';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])

  return (
    <PageContainer>
      <Card.Body className="p-5 d-flex flex-column flex-md-row justify-content-around align-items-center">
        <div>
          <Image src={registrationImage} roundedCircle alt="Регистрация"/>
        </div>
        <SignUpForm />
      </Card.Body>
    </PageContainer>
  );
};

export default SignUpPage;
