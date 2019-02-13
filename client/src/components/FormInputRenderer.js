import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { FormControl, ControlLabel } from 'react-bootstrap';

import { idFromString } from '../util';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

// Renders a set of form input and calls a callback when one changes
// Inputs:
//    questions -> a list of question objects like:
//      [{question: "This is question text?", type: "select", options: Array(2)}, ...]
//    onValueChange -> a callback for when the value of an input changes, signature:
//      onValueChange(questionId, questionData)
//    values -> a map of values for the controlled form inputs like:
//      { <questionId>: {response: <some value>, ... }, ...}
const FormInputRenderer = (props) => {
  const { questions, onValueChange, values } = props;
  console.log('>>>', questions, values);

  return (
    questions.map((question, idx) => {
      const questionId = idFromString(question.question);
      if (question.type === 'text') {
        return (
          <div key={idx}>
            <ControlLabel>{question.question}</ControlLabel>
            <StyledFormControl
              type="text"
              value={get(values, `${questionId}.response`) || ""}
              onChange={
                (event) => onValueChange(
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
                get(values, `${questionId}.response`, '')
              }
              onChange={
                (event) => onValueChange(
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
  );
};


export default FormInputRenderer;
