import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Typography, Layout } from 'antd';
import { map, reduce, compact, flatten, each } from 'lodash';
import  geojson from 'geojson';

import MapTool from '../components/MapTool';
import MapQuestion from '../components/MapQuestion';

const { Sider, Content } = Layout;

const { Title, Paragraph } = Typography;

const SideBarQuestion = styled(Paragraph)`
  background-color: ${props => props.active ? '#a1d6fc': null};
  cursor: ${props => props.active ? null: 'pointer'};
  padding: 10px;
  border-radius: 4px;
`;

export const featureFromGeometry = (geometry) => {
  if (geometry.type === 'polygon'){
    return {
      polygon: geometry.geometry
    };
  }
  return {};
};

class MapPage extends Component {

  constructor(prop) {
    super(prop);
    console.log(this.props.activity.questions);
    this.state = {
      questionIndex: 0,
      activityComplete: false,
      gisDisplay: {}
    }
  }

  // Gets the raw data for the current question, along with its id
  getCurrentQuestionData(){
    return this.props.activity.questions[this.state.questionIndex];
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

    this.props.onUpdate(questionData.id, featureFromGeometry(featureGeometry));
    
    this.state.gisDisplay[questionData.id] = featureGeometry;

    console.log(this.state.gisDisplay);

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


    return (
        <Layout
          style={{
            height: '100%',
            background: 'none',
          }}
        >
          <Sider
            style={{
              background: 'none',
              padding: '0 20px',
            }}
            width='400'
          >
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
                    {question.title}
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
          </Sider>
          <Content
            style={{
              background: 'none',
              height: '100%',
            }}
          >
            <MapTool
              center={activity.center}
              zoomLevel={activity.zoomLevel}
              onFeatureDrawn={this.onFeatureDrawn}
              polygons={this.state.gisDisplay}
            />
          </Content>
        </Layout>
    );
  }
}

export default MapPage;
