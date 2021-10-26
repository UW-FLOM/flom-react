import React, { Component, lazy, Suspense } from 'react';
import {
  Button, Card, Container, Row, Col,
} from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { map } from 'lodash';

import Loading from './Loading';

const QuestionPanel = lazy(() => import('./QuestionPanel')
  .then(({ default: QuestionPanel }) => ({ default: QuestionPanel })));

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
          title: `About ${area.properties.name}`,
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
    document.getElementById('side').scroll({ top: 0 });
    document.getElementById('mapContainer').scroll({ top: 0 });
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
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  style={{
                    marginBottom: '20px',
                    height: '139px',
                  }}
                  onClick={this.addMapQuestion}
                >
                  <BsPlus />
                  {' '}
                  Add Another Area
                </Button>
              </div>
              <Container>
                <Row>
                  <Col align="center">
                    <Button variant="primary" onClick={this.props.onFinish}>
                      Next
                    </Button>
                  </Col>
                </Row>
              </Container>
            </>
          )
          : (
            <Card
              key={questions[index].id}
            >
              <Card.Header>{questions[index].title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Suspense fallback={<Loading />}>
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
                      mode={mode}
                    />
                  </Suspense>
                </Card.Text>
              </Card.Body>
            </Card>
          )}
      </>
    );
  }
}

export default MapQuestion;
