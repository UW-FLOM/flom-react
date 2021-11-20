import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import user from '../services/user';

function DashboardPage() {
  const [content, setContent] = useState('');

  useEffect(() => {
    user.test().then(
      (response) => {
        setContent(JSON.stringify(response.data));
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
    </>
  );
}

export default DashboardPage;
