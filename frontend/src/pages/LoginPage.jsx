import React from 'react';
import RegistrationForm from "../components/RegistrationForm";

const LoginPage = () => {
  return (
  <div className="container-fluid h-100">
    <div className="row align-content-center justify-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <RegistrationForm />
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
