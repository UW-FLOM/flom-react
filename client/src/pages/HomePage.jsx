import React, {Component} from 'react';
import {map} from 'lodash';
import {getSurveyList} from '../services/api';
import {Button, Card, Col, Container, Nav, Navbar, Row} from 'react-bootstrap';

class HomePage extends Component {
  state = {
    survey: []
  }

  // Get the survey definitions
  componentDidMount() {
    getSurveyList()
      .then(res => this.setState({survey: res}))
      .catch(err => console.log(err));
  }

  render() {
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
                map(this.state.survey, (survey) => {
                  return (
                    <Col md={4}>
                      <Card className="mb-4">
                        <Card.Body>
                          <Card.Title>{survey.name}</Card.Title>
                          <Card.Text>
                            Sample Text
                          </Card.Text>
                          <Button variant="primary" href={`/survey/${survey.surveyid}`}>Take Survey</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              }
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default HomePage;
