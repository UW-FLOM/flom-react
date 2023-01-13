import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

import auth from '../../services/auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeUsername = (evt) => {
    setUsername(evt.target.value);
  };

  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleLogin = (evt) => {
    setLoading(true);
    evt.preventDefault();
    auth.login(username, password).then(
      () => {
        window.location.replace('/dashboard');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="login" onSubmit={handleLogin}>
      <Form className="form-signin text-center">
        <h1 className="h3 mb-3 font-weight-normal">Log in</h1>
        <Form.Group className="mb-3">
          <Form.Control
            className="form-control"
            id="username"
            placeholder="Username"
            required
            onChange={onChangeUsername}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            className="form-control"
            id="password"
            type="password"
            placeholder="Password"
            required
            onChange={onChangePassword}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          Submit
        </Button>
        {message && (
          <Form.Group className="mb-3">
            <Alert variant="danger">{message}</Alert>
          </Form.Group>
        )}
      </Form>
    </div>
  );
}

export default LoginPage;
