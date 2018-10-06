import React, { Component } from 'react';

import styled from 'styled-components';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Header } from '../components/Typography';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

class SampleFormPage extends Component {
  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <Header>About You</Header>

            <ControlLabel>What is your gender?</ControlLabel>
            <StyledFormControl componentClass="select" placeholder="choose">
              <option value="choose">Choose one</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="intersex">Intersex</option>
              <option value="androgyne">Androgyne</option>
              <option value="notListed">The option I would choose is not listed</option>
              <option value="preferNone">I prefer not to state</option>
            </StyledFormControl>
            <ControlLabel>How old are you?</ControlLabel>
            <StyledFormControl type="text" />
            <ControlLabel>
              What is the highest level of school you have completed?
            </ControlLabel>
            <StyledFormControl componentClass="select" placeholder="none">
              <option value="none">None</option>
              <option value="elementary">Elementary school</option>
              <option value="highSchool">High school</option>
              <option value="associates">Associate's degree</option>
              <option value="bachelors">Bachelor's degree</option>
              <option value="more">Master's degree or more</option>
            </StyledFormControl>
            <Button bsStyle="primary"> Submit </Button>

        </FormGroup>
        </form>
      </div>
    );
  }
}

export default SampleFormPage;
