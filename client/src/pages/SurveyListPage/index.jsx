import { useState, useEffect } from 'react';
import {
  Container, ListGroup, Nav, Navbar,
} from 'react-bootstrap';

import { map } from 'lodash';
import user from '../../services/user';

function SurveyListPage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    user.surveyList().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = (error.response && error.response.data)
          || error.message
          || error.toString();
        setContent(_content);
      },
    );
  }, []);

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>FLOM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/survey">Survey</Nav.Link>
            <Nav.Link href="#survey">Response</Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="/logout">Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <ListGroup>
        {
          // Render a list of links
          map(content, (surveyItem) => (
            <ListGroup.Item key={surveyItem.survey_id} action href={`/dashboard/survey/${surveyItem.survey_id}`}>
              {surveyItem.name}
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </>
  );
}

export default SurveyListPage;
