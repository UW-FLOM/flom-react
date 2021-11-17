import React, { useState, useEffect } from 'react';
import {
  Container, Nav, Navbar,
} from 'react-bootstrap';
import ReactJson from 'react-json-view';
import user from '../services/user';

function SurveyDetailPage(props) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    user.surveyDetail(props.match.params.surveyId).then(
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
      <ReactJson src={content} />
    </>
  );
}

export default SurveyDetailPage;
