import React, { Component } from 'react';

import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Layout } from '../components/Layout';

import { Header } from '../components/Typography';

const StyledFormControl = styled(Form.Control)`
  margin-bottom: 15px;
`;

class SampleFormPage extends Component {
  render() {
    return (
      <Layout>
        <form>
          <Form.Group>
            <Header>About You</Header>

            <Form.Label>What is your gender?</Form.Label>
            <StyledFormControl as="select" placeholder="choose">
              <option value="choose">Choose one</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="intersex">Intersex</option>
              <option value="androgyne">Androgyne</option>
              <option value="notListed">The option I would choose is not listed</option>
              <option value="preferNone">I prefer not to state</option>
            </StyledFormControl>
            <Form.Label>How old are you?</Form.Label>
            <StyledFormControl type="text" />
            <Form.Label>
              What is the highest level of school you have completed?
            </Form.Label>
            <StyledFormControl as="select" placeholder="none">
              <option value="none">None</option>
              <option value="elementary">Elementary school</option>
              <option value="highSchool">High school</option>
              <option value="associates">Associate's degree</option>
              <option value="bachelors">Bachelor's degree</option>
              <option value="more">Master's degree or more</option>
            </StyledFormControl>
            <Button variant="primary"> Submit </Button>

        </Form.Group>
        </form>
      </Layout>
    );
  }
}

export default SampleFormPage;
