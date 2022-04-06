import './style.css';

import { Col, Container, Row } from 'react-bootstrap';

import React from 'react';

const Test2 = () => {
  return (
    <>
      <div className="wrap">
        <Row>
          <Col className="block green"></Col>

          <Col className="block blue"></Col>
        </Row>
      </div>
    </>
  );
};

export default Test2;
