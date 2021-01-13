import React, { Component } from 'react';
import {
  Row, Col, Divider, Button, Collapse,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { map } from 'lodash';

import FormRender from './FormRender';

const { Panel } = Collapse;

function FormContent(props) {
  return (
    <>
      <Divider />
      <FormRender
        questions={props.questions}
        onChange={props.onChange}
        values={props.values}
        onFinish={props.onFinish}
      />
    </>
  );
}

class QuestionPanel extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      displaySurvey: false,
    };
    this.onFormItemChange = this.onFormItemChange.bind(this);
  }

  componentDidUpdate() {
    const shouldDisplaySurvey = this.props.values[this.props.question.id]
      && this.props.question.questions;
    if (shouldDisplaySurvey !== this.state.displaySurvey) {
      this.setState({ displaySurvey: shouldDisplaySurvey });
    }
  }

  onFormItemChange(questionID, response) {
    let currentResponse;
    if (this.props.values[this.props.question.id]) {
      currentResponse = this.props.values[this.props.question.id];
    }
    currentResponse[questionID] = response;
    this.props.onChange(this.props.question.id, currentResponse);
  }

  render() {
    return (
      <>
        <Row justify="center">
          <Col span={8}>
            <Button type="primary" icon={<EditOutlined />} onClick={this.props.fireDraw}>
              {!this.props.values[this.props.question.id]
                ? 'Draw'
                : 'Redraw'}
            </Button>
          </Col>
        </Row>
        {
          this.state.displaySurvey
          && (
            <FormContent
              questions={this.props.question.questions}
              values={this.props.values[this.props.question.id]}
              onChange={this.onFormItemChange}
            />
          )
        }
      </>
    );
  }
}

class MapQuestion extends Component {
  render() {
    return (
      <Collapse
        accordion
        onChange={this.props.onClick}
        defaultActiveKey={['0']}
        key="MapQuestionBoard"
      >
        {map(this.props.questions, (question, idx) => (
          <Panel
            key={idx}
            header={question.title}
          >
            <QuestionPanel
              key={idx}
              question={question}
              values={this.props.values}
              fireDraw={this.props.fireDraw}
              onChange={this.props.onChange}
            />
          </Panel>
        ))}
      </Collapse>
    );
  }
}

export default MapQuestion;
