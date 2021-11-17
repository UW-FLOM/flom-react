import React, { useState, useEffect } from 'react';
import { map } from 'lodash';
import {
  Button, Card, Col, Container, Nav, Navbar, Row,
} from 'react-bootstrap';
import { getSurveyList } from '../services/api';

function HomePage() {
  const [survey, setSurvey] = useState([]);

  // Get the survey definitionÒ
  useEffect(() => {
    getSurveyList()
      .then((res) => setSurvey(res))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>FLOM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/login">Log In</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <section className="jumbotron text-center">
        <Container>
          <h1 className="jumbotron-heading">Folk Linguistic Online Mapping</h1>
          <p className="lead text-muted">Project Explanation.</p>
        </Container>
      </section>
      <div className="py-5">
        <Container>
          <Row>
            {
              // Render a list of links
              map(survey, (surveyItem) => (
                <Col key={surveyItem.survey_id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{surveyItem.name}</Card.Title>
                      <Card.Text>
                        Sample Text
                      </Card.Text>
                      <Button variant="primary" href={`/survey/${surveyItem.survey_id}`}>Take Survey</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomePage;
