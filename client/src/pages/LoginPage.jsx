import React from 'react';
import {
  Button, Form
} from 'react-bootstrap';

function LoginPage() {
  return (
    <div className="login">
      <Form className="form-signin text-center">
        <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control className="form-control" type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control className="form-control" type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
