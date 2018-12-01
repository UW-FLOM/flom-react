import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { map, reduce, compact } from 'lodash';

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

  onRegionDrawn = (latLngs) => {
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
            response: latLngs
          }
        },
        questionIndex: newQuestionIndex,
        activityComplete: activityComplete
      };
    });
  }

  render() {

    const {
      activity
    } = this.props;

    const existingPolygons = compact(map(this.state.questions, 'response'));

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
            onClick={() => this.props.onSubmit(this.state.questions)}
          >
            Submit
          </SubmitButton>
        </SideBar>
        <MapTool
          center={activity.center}
          zoomLevel={activity.zoomLevel}
          onRegionDrawn={this.onRegionDrawn}
          polygons={existingPolygons}
        />
      </ActivityContainer>
      <MapQuestionBox text={this.getCurrentQuestionData().question}></MapQuestionBox>
      </React.Fragment>
    );
  }
}

export default MapActivity;
