import React, { Component } from 'react';
import { Button, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import FormRender from './FormRender';

class QuestionPanel extends Component {
  constructor(prop) {
    super(prop);
    const displaySurvey = this.props.noDraw;
    this.state = {
      displaySurvey,
    };
    this.onFormItemChange = this.onFormItemChange.bind(this);
    this.fireDraw = this.fireDraw.bind(this);
    if (this.props.noDraw) {
      this.props.onChange(this.props.question.id, {});
      const area = { GISObject: this.props.question.area };
      this.props.changeGIS(area);
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

  fireDraw() {
    this.props.updateQuestionID(this.props.question.id);
    this.props.fireDraw();
  }

  render() {
    const {
      noDraw, onFinish, values, question, mode,
    } = this.props;
    return (
      <>
        {(!values[question.id] && !noDraw)
        && (
          <Row justify="center">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={this.fireDraw}
              disabled={mode === 'CREATE'}
            >
              {(mode === 'CREATE') ? 'Drawing' : 'Draw'}
            </Button>
          </Row>
        )}
        {((values[question.id] && question.questions)
          || noDraw)
        && (
          <FormRender
            questions={question.questions}
            onChange={this.onFormItemChange}
            values={values[question.id]}
            onFinish={onFinish}
          />
        )}
        {(values[question.id] && !question.questions)
        && (
          <Row justify="center">
            <Button type="primary" onClick={onFinish}>
              Next
            </Button>
          </Row>
        )}
      </>
    );
  }
}

export default QuestionPanel;
