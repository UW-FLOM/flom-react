import React, { Component } from 'react';
import { Button, Card, Row } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { map } from 'lodash';

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
      noDraw, onFinish, values, question,
    } = this.props;
    return (
      <>
        {(!values[question.id] && !noDraw)
        && (
          <Row justify="center">
            <Button type="primary" icon={<EditOutlined />} onClick={this.fireDraw}>
              Draw
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

class MapQuestion extends Component {
  constructor(prop) {
    super(prop);

    const {
      activity,
    } = this.props;

    const index = 0;
    let { questions } = activity;

    if (activity.function === 'freedraw') {
      questions = [{
        title: 'Draw New Area',
        id: activity.id + index,
        questions: [
          {
            title: 'Name this area',
            type: 'text',
            id: 'name',
          },
        ],
      }];
    }

    if (activity.function === 'additional') {
      const areas = this.props.values[activity.basedOn];
      questions = [];
      map(areas, (area, id) => (
        questions = [...questions, {
          title: `About ${area.name}`,
          id,
          area: area.GISObject,
          questions: this.props.activity.questions,
        }]
      ));
    }

    this.state = {
      index,
      questions,
      activityComplete: false,
    };

    this.addMapQuestion = this.addMapQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  addMapQuestion() {
    const newIndex = this.state.index + 1;

    this.setState((state) => ({
      index: newIndex,
      activityComplete: false,
      questions: [...state.questions, {
        title: 'Draw New Area',
        id: this.props.activity.id + newIndex,
        questions: [
          {
            title: 'Name this area',
            type: 'text',
            id: 'name',
          },
        ],
      }],
    }));
  }

  nextQuestion() {
    const { questions, index } = this.state;
    const nextQuestionIndex = index + 1;
    const activityComplete = nextQuestionIndex >= questions.length;

    if (activityComplete) {
      const { activity, onFinish } = this.props;
      if (activity.function === 'freedraw') {
        this.setState({
          activityComplete: true,
        });
      } else {
        onFinish();
      }
    } else {
      this.setState({
        index: nextQuestionIndex,
      });
    }
  }

  render() {
    const {
      activity,
      mode,
      values,
      fireDraw,
      onChange,
      updateQuestionID,
      changeGIS,
    } = this.props;

    const {
      questions,
      index,
      activityComplete,
    } = this.state;

    return (
      <>
        {activityComplete
          ? (
            <>
              <Button
                block
                type="dashed"
                icon={<PlusOutlined />}
                disabled={mode === 'CREATE'}
                style={{
                  marginBottom: '20px',
                  height: '139px',
                }}
                onClick={this.addMapQuestion}
              >
                Add Another Area
              </Button>
              <Row justify="center">
                <Button type="primary" onClick={this.props.onFinish}>
                  Next
                </Button>
              </Row>
            </>
          )
          : (
            <Card
              key={index}
              title={questions[index].title}
            >
              <QuestionPanel
                key={questions[index].id}
                noDraw={(activity.function === 'additional')}
                question={questions[index]}
                values={values[activity.id]}
                fireDraw={fireDraw}
                onChange={onChange}
                updateQuestionID={updateQuestionID}
                changeGIS={changeGIS}
                onFinish={this.nextQuestion}
              />
            </Card>
          )}
      </>
    );
  }
}

export default MapQuestion;
