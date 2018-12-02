import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { map, reduce, compact, flatten, each } from 'lodash';
import  geojson from 'geojson';

import { Header, PlainText } from '../components/Typography';
import MapTool from '../components/MapTool';
import MapQuestion from '../components/MapQuestion';

import { idFromString } from '../util';

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

const IntroText = styled(PlainText)`
  margin-left: 0px;
`;

const SubmitButton = styled(Button)`
  margin: auto;
`;

const SideBarQuestion = styled(PlainText)`
  background: ${props => props.active ? '#a1d6fc': null}
  padding: 10px;
  border-radius: 4px;
`;

const MapQuestionBox = styled(MapQuestion)`
  position: absolute;
  top: 10px;
  left: 360px;
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

  state ={
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
    questionIndex: 0,
    activityComplete: false
  }

  getCurrentQuestionData(){
    const questionPropData = this.props.activity.questions[this.state.questionIndex];
    return {
      ...questionPropData,
      questionId: idFromString(questionPropData.question)
    };
  }

  onFeatureDrawn = (featureGeometry) => {
    const questionData = this.getCurrentQuestionData();
    const questionId = questionData.questionId;

    this.setState((previousState) => {
      const nextQuestionIndex = previousState.questionIndex + 1;
      const activityComplete = nextQuestionIndex >= this.props.activity.questions.length;

      const newQuestionIndex = activityComplete
        ? previousState.questionIndex
        : nextQuestionIndex;

      return {
        ...previousState,
        questions: {
          ...previousState.questions,
          [questionId]: {
            ...previousState.questions[questionId],
            response: [featureFromGeometry(featureGeometry)]
          }
        },
        questionIndex: newQuestionIndex,
        activityComplete: activityComplete
      };
    });
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
          <Header>{activity.title}</Header>
          <IntroText>
            {activity.helpText}
          </IntroText>
          {
            map(activity.questions, (question, idx) => {
              return (
                <SideBarQuestion key={idx} active={idx === this.state.questionIndex}>
                  {question.question}
                </SideBarQuestion>
              );
            })
          }
          <SubmitButton
            bsStyle="primary"
            onClick={this.submitResponses}
          >
            Submit
          </SubmitButton>
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
