import React from 'react';
import Image from "react-bootstrap/Image";
import notFoundImage from "../images/notFound.svg";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <Image src={notFoundImage} fluid className="h-25" alt="Страница не найдена" />
      <h1 className="h-4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        {'Но вы можете перейти '}
        <a href="/">на главную страницу</a>
      </p>
    </div>

  );
};

export default ErrorPage;
