import { useState, useEffect } from 'react';
import { map } from 'lodash';
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from 'react-bootstrap';
import { getSurveyList } from '../../services/api';
import { Menu } from '../../components/Menu';

function HomePage() {
    const [survey, setSurvey] = useState('');

  // Get the survey definitionÒ

    useEffect(() => {
    console.log('Client: homepage index');
        getSurveyList()
            .then((res) => setSurvey(res))
            .catch((err) => console.log(err));
  },[]);

  return (
    <>
        <Menu />
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
                <Col key={surveyItem.id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{surveyItem.name}</Card.Title>
                      <Card.Text>Sample Text</Card.Text>
                      <Button
                        variant="primary"
                        href={`/survey/${surveyItem.id}`}
                      >
                        Take Survey
                      </Button>
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
