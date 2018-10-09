import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FormControl, ControlLabel } from 'react-bootstrap';

import { Header, PlainText } from '../components/Typography';
import { idFromString } from '../util';

const FormLayout = styled.div`
  margin: auto;
  width: 900px;
  padding: 0px 15px;
  height: 100%;
`;

const IntroText = styled(PlainText)`
  margin-left: 0px;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

class FormActivity extends Component {

  state ={
    answers: {}
  }

  handleValueUpdate = (questionId, value) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        answers: {
          ...previousState.answers,
          [questionId]: value,
        },
      };
    });
  }

  render() {
    console.log('INFO: form state on render:', JSON.stringify(this.state));

    return (
      <FormLayout>
        <Header>{this.props.activity.title}</Header>
        <IntroText>
          {this.props.activity.helpText}
        </IntroText>
        {
          this.props.activity.questions.map((question, idx) => {
            const questionId = idFromString(question.question);
            if (question.type === 'text') {
              return (
                <div key={idx}>
                  <ControlLabel>{question.question}</ControlLabel>
                  <StyledFormControl
                    type="text"
                    value={this.state.answers[questionId] || ""}
                    onChange={
                      (event) => this.handleValueUpdate(questionId, event.target.value)
                    }
                    />
                </div>
              );
            } else if (question.type === 'select') {
              return (
                <div key={idx}>
                  <ControlLabel>{question.question}</ControlLabel>
                  <StyledFormControl
                    componentClass="select"
                    type="select"
                    value={this.state.answers[questionId] || ""}
                    onChange={
                      (event) => this.handleValueUpdate(questionId, event.target.value)
                    }
                  >
                    {question.options.map((option, idx) => {
                      return (
                        <option
                          key={idx}
                          value={option.replace(/[^A-Z0-9]+/ig, "_").toLowerCase()}
                        >
                          {option}
                        </option>
                      );
                    })}
                  </StyledFormControl>
                </div>
              );
            }
            return <p key={idx}>{JSON.stringify(question)}</p>;
          })
        }
        <SubmitButton
          bsStyle="primary"
          onClick={() => this.props.onSubmit(this.state.answers)}
        >
          Submit
        </SubmitButton>
      </FormLayout>
    );
  }
}

export default FormActivity;
