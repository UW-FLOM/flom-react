import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import { map, reduce, compact, flatten, each } from 'lodash';
import  geojson from 'geojson';

import MapTool from '../components/MapTool';
import MapQuestion from '../components/MapQuestion';

import { idFromString } from '../util';

const { Title, Paragraph } = Typography;

const ActivityContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  width: 100vw;
  height: 100vh;
`;

const SideBar = styled.div`
  padding: 15px;
  border-right: 1px solid #ccc;
`;

const SideBarQuestion = styled(Paragraph)`
  background-color: ${props => props.active ? '#a1d6fc': null};
  cursor: ${props => props.active ? null: 'pointer'};
  padding: 10px;
  border-radius: 4px;
`;

const MapQuestionBox = styled(MapQuestion)`
  position: absolute;
  top: 10px;
  left: 500px;
  right: 200px;
  z-index: 10000;
`;

export const featureFromGeometry = (geometry) => {
  if (geometry.type === 'polygon'){
    return {
      polygon: geometry.geometry
    };
  }
  return {};
};

class MapActivity extends Component {

  state = {
    // TODO: Abstract this out of activities
    // Use the list of input questions to set state up
    // As a dictionary of qiestionId: question data
    questions: reduce(this.props.activity.questions, (result, value, key) => {
      const questionData = {
        type: value.type,
        indexInActivity: key
      };
      const questionId = idFromString(value.question);
      return {
        ...result,
        [questionId]: questionData
      };
    },{}),
    // Activity start on the first question, incomplete
    questionIndex: 0,
    activityComplete: false
  }

  // Gets the raw data for the current question, along with its id
  getCurrentQuestionData(){
    const questionPropData = this.props.activity.questions[this.state.questionIndex];
    return {
      ...questionPropData,
      questionId: idFromString(questionPropData.question)
    };
  }

  setActiveQuestion(index) {
    this.setState({
      questionIndex: index
    });
  }

  nextQuestion() {
    const nextQuestionIndex = this.state.questionIndex +1;
    const activityComplete = nextQuestionIndex >= this.props.activity.questions.length;

    if (activityComplete) {
      this.setState({
        activityComplete: true
      });
    } else {
      this.setState({
        questionIndex: nextQuestionIndex
      });
    }
  }

  onFeatureDrawn = (featureGeometry) => {
    const questionData = this.getCurrentQuestionData();
    const questionId = questionData.questionId;

    // Add the response to the current question to the state
    this.setState((state) => {
      return {
        questions: {
          ...state.questions,
          [questionId]: {
            ...state.questions[questionId],
            response: [featureFromGeometry(featureGeometry)]
          }
        },
      };
    });

    // Move to the next question
    this.nextQuestion();
  }

  submitResponses = () => {
    const questionsToSubmit = {
      ...this.state.questions
    };

    // Convert response to GeoJson
    each(questionsToSubmit, (question) => {
      question.response = question.response
      ? geojson.parse(question.response, { 'Polygon': 'polygon' })
      : null;
    });

    this.props.onSubmit(questionsToSubmit);
  }

  handleQuestionClick(idx) {
    this.setActiveQuestion(idx);
  }

  render() {

    const {
      activity
    } = this.props;

    // Polygons to pass down to the map tool
    const existingPolygons = flatten(compact(map(this.state.questions, 'response')));

    return (
      <React.Fragment>
        <ActivityContainer>
          <SideBar>
            <Typography>
              <Title>{activity.title}</Title>
              <Paragraph>
                {activity.helpText}
              </Paragraph>
            </Typography>
            {
              map(activity.questions, (question, idx) => {
                return (
                  <SideBarQuestion
                    key={idx}
                    active={idx === this.state.questionIndex}
                    onClick={() => this.handleQuestionClick(idx)}
                  >
                    {question.question}
                  </SideBarQuestion>
                );
              })
            }
            <Button
              type="primary"
              onClick={this.submitResponses}
            >
              Submit
            </Button>
          </SideBar>
          <MapTool
            center={activity.center}
            zoomLevel={activity.zoomLevel}
            onFeatureDrawn={this.onFeatureDrawn}
            polygons={existingPolygons}
          />
        </ActivityContainer>
        <MapQuestionBox text={this.getCurrentQuestionData().question}></MapQuestionBox>
      </React.Fragment>
    );
  }
}

export default MapActivity;
