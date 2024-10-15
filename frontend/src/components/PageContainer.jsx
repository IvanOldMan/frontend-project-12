import React from 'react';
import {
  Card,
  Col,
  Container,
  Row
} from 'react-bootstrap';

const PageContainer = ({ children }) => (
  <Container className="h-100" fluid >
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          { children }
        </Card>
      </Col>
    </Row>
  </Container>
  );

export default PageContainer;
