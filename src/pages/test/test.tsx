import './style.css';

import { Col, Container, Form, Row } from 'react-bootstrap';

import React from 'react';
import { execPath } from 'process';

const fakeList = [
  {
    // 1st row
    NoOfDevicesLeft: [],
    DataList: [{ name: 'First block' }, { name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }]
  },
  {
    // 2nd row
    NoOfDevicesLeft: [],
    DataList: [{ name: 'E' }, { name: 'F' }, { name: 'G' }, { name: 'H' }, { name: 'I' }]
  },
  {
    // 3rd row

    NoOfDevicesLeft: [],
    DataList: [{ name: 'J' }, { name: 'K' }, { name: 'L' }, { name: 'M' }]
  }
];

const ABC = () => {
  return (
    <Container fluid className="">
      {fakeList.map((row, index) => {
        if (index === 0) {
          return (
            <Row key={index} className="device-row even align-items-center">
              <Col md={1}></Col>
              {row.DataList.map((block, blockIndex) => {
                return (
                  <Col
                    md={2}
                    key={index + blockIndex + ''}
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      // backgroundColor: 'pink',
                      height: '100%',
                      justifyContent: 'center'
                    }}>
                    <Row style={{ display: 'block' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          padding: 0
                        }}>
                        <div>
                          <span
                            className="device"
                            style={{
                              display: 'block',
                              textAlign: 'center',
                              border: '2px black solid',
                              zIndex: '1',
                              backgroundColor: 'whitesmoke'
                            }}>
                            {block.name}
                          </span>
                          <div
                            className="line"
                            style={{
                              borderRight: blockIndex === 4 ? '3px black solid' : ''
                            }}></div>
                        </div>
                      </div>
                    </Row>
                  </Col>
                );
              })}
              <Col md={1}></Col>
            </Row>
          );
        }

        //normal case
        if (index % 2 == 0) {
          return (
            <Row key={index} className="device-row even align-items-center">
              <Col md={1}></Col>
              {row.DataList.map((block, blockIndex) => {
                return (
                  <Col
                    md={2}
                    key={index + blockIndex + ''}
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      // backgroundColor: 'pink',
                      height: '100%',
                      justifyContent: 'center'
                    }}>
                    <Row style={{ display: 'block' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          padding: 0
                        }}>
                        <div>
                          <span
                            className="device"
                            style={{
                              display: 'block',
                              textAlign: 'center',
                              border: '2px black solid',
                              zIndex: '1',
                              backgroundColor: 'whitesmoke'
                            }}>
                            {block.name}
                          </span>
                          <div
                            className="line"
                            style={{
                              width: blockIndex === 0 ? '500px' : '350px',
                              marginLeft: blockIndex === 0 ? '-100px' : ''
                            }}></div>
                        </div>
                      </div>
                    </Row>
                  </Col>
                );
              })}
              <Col md={1}></Col>
            </Row>
          );
        } else {
          return (
            <Row
              key={index}
              className="device-row even align-items-center"
              style={{ flexDirection: 'row-reverse' }}>
              <Col md={1}></Col>
              {row.DataList.map((block, blockIndex) => {
                return (
                  <Col
                    md={2}
                    key={index + blockIndex + ''}
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      // backgroundColor: 'pink',
                      height: '100%',
                      justifyContent: 'center'
                    }}>
                    <Row style={{ display: 'block' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          height: '100%',
                          padding: 0
                        }}>
                        <div>
                          <span
                            className="device"
                            style={{
                              display: 'block',
                              textAlign: 'center',
                              border: '2px black solid',
                              zIndex: '1',
                              backgroundColor: 'whitesmoke'
                            }}>
                            {block.name}
                          </span>
                          <div
                            className="line"
                            style={{
                              width: blockIndex === 4 ? '500px' : '350px',
                              marginLeft: blockIndex === 4 ? '-100px' : '',
                              borderLeft: blockIndex === 4 ? '3px black solid' : ''
                            }}></div>
                        </div>
                      </div>
                    </Row>
                  </Col>
                );
              })}
              <Col md={1}></Col>
            </Row>
          );
        }
      })}
    </Container>
  );
};

export default ABC;
