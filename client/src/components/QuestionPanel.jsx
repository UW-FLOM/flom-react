import React, { Component, lazy, Suspense } from 'react';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';
import { EditOutlined } from '@ant-design/icons';
import Loading from './Loading';

const FormRender = lazy(() => import('../components/FormRender')
  .then(({ default: FormRender }) => ({ default: FormRender })));

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
          <Container>
            <Row>
              <Col align="center">
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={this.fireDraw}
                  disabled={mode === 'CREATE'}
                >
                  {(mode === 'CREATE') ? 'Drawing' : 'Draw'}
                </Button>
              </Col>
            </Row>
          </Container>
        )}
        {((values[question.id] && question.questions)
          || noDraw)
        && (
          <Suspense fallback={<Loading />}>
            <FormRender
              questions={question.questions}
              onChange={this.onFormItemChange}
              values={values[question.id]}
              onFinish={onFinish}
            />
          </Suspense>
        )}
        {(values[question.id] && !question.questions)
        && (
          <Container>
            <Row>
              <Col align="center">
                <Button type="primary" onClick={onFinish}>
                  Next
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default QuestionPanel;
