import React, { useReducer, useState } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { map } from 'lodash';
import PropTypes from 'prop-types';

import AudioButton from './AudioButton';

function Label({ label, audio }) {
  Label.propTypes = {
    label: PropTypes.string.isRequired,
    audio: PropTypes.string,
  };

  Label.defaultProps = {
    audio: undefined,
  };

  return (
    <Form.Label>
      {label}
      {audio && <AudioButton src={audio} />}
    </Form.Label>
  );
}

function FormRender({
  questions, onChange, onFinish,
}) {
  FormRender.propTypes = {
    questions: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
  };

  const [inputs, setInputs] = useState({});

  const submitResponse = (event) => {
    // Need to handle the submission to avoid
    // Form submission canceled because the form is not connected
    event.preventDefault();
    // Store the response
    // TODO: Migrate to Redux
    map(inputs, (value, key) => {
      if (value !== undefined) {
        onChange(key, value);
      }
    });
    onFinish();
  };

  const handleChange = (event) => {
    setInputs(
      {
        ...inputs,
        [event.target.id]: event.target.value,
      },
    );
    console.log(event.target.id);
    console.log(event.target.value);
    console.log(inputs);
  };

  return (
    <Form
      onSubmit={submitResponse}
    >
      {questions.map((question) => {
        const rules = { required: true };
        if (question.required) {
          rules.required = (question.required === 'true');
        }
        if (question.min) {
          rules.type = 'number';
          rules.min = parseInt(question.min);
        }
        if (question.type === 'text') {
          return (
            <Form.Group className="mb-3" key={question.id}>
              <Label label={question.title} audio={question.audio} />
              <Form.Control type="text" id={question.id} onChange={handleChange} />
            </Form.Group>
          );
        }
        if (question.type === 'select') {
          return (
            <Form.Group className="mb-3" key={question.id}>
              <Label label={question.title} audio={question.audio} />
              <Form.Select aria-label={question.title} id={question.id} defaultValue="" onChange={handleChange}>
                <option disabled value=""> -- select an option -- </option>
                {question.options.map((option) => (
                  <option
                    id={option.id}
                    key={option.id}
                    value={option.id}
                  >
                    {option.text}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          );
        }
        if (question.type === 'rate') {
          return (
            <Form.Group
              key={question.id}
            >
              <Label label={question.title} audio={question.audio} />
              <Form.Range id={question.id} onChange={handleChange} />
            </Form.Group>
          );
        }
        if (question.type === 'num') {
          return (
            <Form.Group
              key={question.id}
            >
              <Label label={question.title} audio={question.audio} />
              <Form.Control type="number" id={question.id} onChange={handleChange} />
            </Form.Group>
          );
        }
        if (question.type === 'textarea') {
          return (
            <Form.Group
              key={question.id}
            >
              <Label label={question.title} audio={question.audio} />
              <Form.Control type="textarea" id={question.id} onChange={handleChange} />
            </Form.Group>
          );
        }
        if (question.type === 'radio') {
          return (
            <Form.Group
              key={question.id}
            >
              <Label label={question.title} audio={question.audio} />
              <div key={question.id} className="mb-3">
                {question.options.map((option) => (
                  <Form.Check
                    inline
                    type="radio"
                    key={option.id}
                    id={option.id}
                    label={option.text}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </Form.Group>
          );
        }
        if (question.type === 'boolean') {
          return (
            <Form.Group
              key={question.id}
            >
              <Label label={question.title} audio={question.audio} />
              <div key={question.id} className="mb-3">
                <Form.Check
                  inline
                  type="radio"
                  key="true"
                  id={`${question.id}true`}
                  label="True"
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  key="false"
                  id={`${question.id}false`}
                  label="False"
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          );
        }
        if (question.type === 'checkbox') {
          return (
            <Form.Group
              key={question.id}
            >
              <Label label={question.title} audio={question.audio} />
              <div key={question.id} className="mb-3">
                {question.options.map((option) => (
                  <Form.Check
                    inline
                    type="checkbox"
                    key={option.id}
                    id={option.id}
                    label={option.text}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </Form.Group>
          );
        }
      })}
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col align="center">
            <Button variant="primary" type="submit">
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default FormRender;
