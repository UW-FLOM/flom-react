import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FormControl, ControlLabel} from 'react-bootstrap';

import { Header, PlainText } from '../components/Typography';

const IntroText = styled(PlainText)`
  margin-left: 0px;
`

const SubmitButton = styled(Button)`
  margin: auto;
`

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`

class Intro extends PureComponent {
  render() {
    return (
      <div>
        <Header>{this.props.activity.title}</Header>
        <IntroText>
          {this.props.activity.helpText}
        </IntroText>
        {
          this.props.activity.questions.map((question, idx) => {
            if (question.type === 'text') {
              return (
                <div key={idx}>
                  <ControlLabel>{question.question}</ControlLabel>
                  <StyledFormControl type="text" />
                </div>
              )
            } else if (question.type === 'select') {
              return (
                <div key={idx}>
                  <ControlLabel>{question.question}</ControlLabel>
                  <StyledFormControl 
                    componentClass="select" 
                    type="select" 
                    placeholder="Select one"
                  >
                    {question.options.map((option, idx) => {
                      return (
                        <option 
                          key={idx} 
                          value={option.replace(/[^A-Z0-9]+/ig, "_").toLowerCase()}
                        >
                          {option}
                        </option>
                      )
                    })}
                  </StyledFormControl>
                </div>
              )
            }
            return <p key={idx}>{JSON.stringify(question)}</p>
          })
        }
        <SubmitButton bsStyle="primary" onClick={this.props.onBeginClick}>
          Submit
        </SubmitButton>
      </div>
    );
  }
}

export default Intro;
