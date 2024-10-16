import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'react-bootstrap/Image';
import notFoundImage from '../images/notFound.svg';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image src={notFoundImage} fluid className="h-25" alt={t('errorPage.alt')} />
      <h1 className="h-4 text-muted">{t('errorPage.title')}</h1>
      <p className="text-muted">
        {t('errorPage.body.text')}
        <a href="/">
          {t('errorPage.body.link')}
        </a>
      </p>
    </div>
  );
};

export default ErrorPage;
