import React, { Component } from 'react';
import styled from 'styled-components';
import { get, reduce } from 'lodash';
import { Button, Typography } from 'antd';

import FormInputRenderer from '../components/FormInputRenderer';
import { idFromString } from '../util';

const { Title, Paragraph } = Typography;

const FormLayout = styled.div`
  margin: auto;
  width: 900px;
  padding: 0px 15px;
  height: 100%;
`;

class FormActivity extends Component {

  // Sets up the state ahead of time based on the questions.
  // State will store each questions answer and index in
  // the activity
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
        <Title>{this.props.activity.title}</Title>
        <Paragraph>
          {this.props.activity.helpText}
        </Paragraph>
        <FormInputRenderer
          questions={this.props.activity.questions}
          onValueChange={this.handleValueUpdate}
          values={this.state.questions}
        />
        <Button
          type="primary"
          onClick={() => this.props.onSubmit(this.state.questions)}
        >
          Submit
        </Button>
      </FormLayout>
    );
  }
}

export default FormActivity;
