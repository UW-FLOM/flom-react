import React, { Component } from 'react';
import styled from 'styled-components';
import { get, reduce } from 'lodash';
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

  state = {
    questions: reduce(this.props.activity.questions, (result, value, key) => {
      const questionData = {
        type: value.type,
        indexInActivity: key
      };
      const questionId = idFromString(value.question);
      if (value.type === 'text'){
        questionData['response'] = '';
      }
      if (value.type === 'select'){
        questionData['response'] = get(value, 'options[0]', '');
      }
      return {
        ...result,
        [questionId]: questionData
      };
    },{})
  }

  handleValueUpdate = (questionId, questionData) => {
    this.setState((previousState) => {
      return {
        ...previousState,
        questions: {
          ...previousState.questions,
          [questionId]: {
            ...questionData
          },
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
                    value={get(this.state, `questions[${questionId}].response`) || ""}
                    onChange={
                      (event) => this.handleValueUpdate(
                        questionId,
                        {
                          indexInActivity: idx,
                          type: "text",
                          response: event.target.value
                        }
                      )
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
                    value={
                      get(this.state, `questions[${questionId}].response`, '')
                    }
                    onChange={
                      (event) => this.handleValueUpdate(
                        questionId,
                        {
                          indexInActivity: idx,
                          type: "select",
                          response: event.target.value
                        }
                      )
                    }
                  >
                    {question.options.map((option, idx) => {
                      return (
                        <option
                          key={idx}
                          value={idFromString(option)}
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
          onClick={() => this.props.onSubmit(this.state.questions)}
        >
          Submit
        </SubmitButton>
      </FormLayout>
    );
  }
}

export default FormActivity;
