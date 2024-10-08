import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import RegistrationForm from "../components/RegistrationForm";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.authentication);


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated])

  return (
  <div className="container-fluid h-100">
    <div className="row align-content-center justify-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <SignUpForm />
      </div>
    </div>
  </div>
  );
};

export default SignUpPage;
