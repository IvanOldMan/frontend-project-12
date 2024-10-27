import React from 'react';
import { Row, Spinner as BoostrapSpinner } from 'react-bootstrap';

const Spinner = () => (
  <Row className="justify-content-center align-items-center h-100">
    <BoostrapSpinner variant="primary" className="d-flex" animation="border">
      <span className="visually-hidden">Loading...</span>
    </BoostrapSpinner>
  </Row>);

export default Spinner;
