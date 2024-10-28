import React from 'react';
import { Button, Spinner as BoostrapSpinner } from 'react-bootstrap';

const FormButton = ({ text, isLoading }) => {
  const buttonText = isLoading ? 'Loading...' : text;

  return (
    <Button
      className="w-100 mb-3"
      variant="outline-primary"
      type="submit"
      disabled={isLoading}
    >
      { isLoading && (
        <BoostrapSpinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {buttonText}
    </Button>
  );
};

export default FormButton;
