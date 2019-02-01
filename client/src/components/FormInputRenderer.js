import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { FormControl, ControlLabel } from 'react-bootstrap';

import { idFromString } from '../util';

const StyledFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

const FormInputRenderer = (props) => {
  const { questions, onValueChange, values } = props;
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
