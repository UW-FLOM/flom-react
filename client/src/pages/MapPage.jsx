import React, { Component } from 'react';
import { Button, Typography, Layout } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import MapTool from '../components/MapTool';
import MapQuestion from '../components/MapQuestion';

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

export const featureFromGeometry = (geometry) => {
  if (geometry.type === 'polygon') {
    return {
      GISObject: {
        type: "polygon",
        data: geometry.geometry
      }
    };
  }
  return {};
};

class MapPage extends Component {
  constructor(prop) {
    super(prop);

    var storedGisDisplay = [];
    var counter = 0;
    var freehand = [{"title": "Untitled", "id": counter}];

    this.state = {
      questionIndex: 0,
      activityComplete: true,
      gisDisplay: storedGisDisplay,
      mode: "NONE",
      freehand: freehand,
      freehandCounter: counter,
    };

    this.fireDraw = this.fireDraw.bind(this);
    this.addMapQuestion = this.addMapQuestion.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.activity !== this.props.activity) {
      const counter = 0;
      var freehand = [{"title": "Untitled", "id": counter}];
      if (this.props.activity === 'freedraw') {
        this.setState({
          freehand: freehand,
          freehandCounter: counter,
          gisDisplay: [],
          questionIndex: 0,
        });
      }
      this.setState({
        gisDisplay: [],
        questionIndex: 0,
      });
    }
  }

  // Gets the raw data for the current question, along with its id
  getCurrentQuestionData() {
    const questions = this.questionGenerator();
    return questions[this.state.questionIndex];
  }

  setActiveQuestion(index) {
    this.setState({
      questionIndex: index
    });
  }

  nextQuestion() {
    const nextQuestionIndex = this.state.questionIndex + 1;
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

    this.onChange(questionData.id, featureFromGeometry(featureGeometry));

    var gis = this.state.gisDisplay;
    gis[questionData.id] = featureFromGeometry(featureGeometry);

    this.setState({
      gisDisplay: gis,
      mode: "NONE",
    });
  }

  handleQuestionClick = activeKey => {
    this.setState({
      questionIndex: activeKey
    });
  }

  onChange(questionID, response) {
    let currentResponse = this.props.values[this.props.activity.id];
    currentResponse[questionID] = response;
    this.props.onChange(this.props.activity.id, currentResponse);
  }

  fireDraw() {
    this.setState({
      mode: "CREATE"
    });
  }

  addMapQuestion() {
    var newCounter = this.state.freehandCounter + 1;

    this.setState(state => ({
      freehandCounter: newCounter,
      freehand: [...state.freehand, {"title": "Untitled", "id": newCounter}]
    }));
  }

  questionGenerator() {
    if(this.props.activity.function === 'predefined') {
      return this.props.activity.questions;
    }
    if(this.props.activity.function === 'freedraw') {
      return this.state.freehand;
    }
  }
  render() {

    const {
      activity,
      values
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
          <MapQuestion
            key={activity.id}
            questions={this.questionGenerator()}
            fireDraw={this.fireDraw}
            values={values[activity.id]}
            onChange={this.onChange}
            onClick={this.handleQuestionClick}
          />
          {activity.function === 'freedraw' &&
            <Button
              block
              type="dashed"
              icon={<PlusOutlined />}
              disabled={this.state.mode === "CREATE"}
              style={{
                marginTop: '10px'
              }}
              onClick={this.addMapQuestion}
            >
              Add Area
            </Button>}

          {this.state.activityComplete &&
            <Button
              type="primary"
              onClick={this.props.onFinish}
              style={{
                marginTop: '10px'
              }}
            >
              Submit
            </Button>
          }
        </Sider>
        <Content
          style={{
            background: 'none',
          }}
        >
          <MapTool
            center={activity.center}
            zoomLevel={activity.zoomLevel}
            onFeatureDrawn={this.onFeatureDrawn}
            objects={Object.values(this.state.gisDisplay)}
            mode={this.state.mode}
          />
        </Content>
      </Layout>
    );
  }
}

export default MapPage;
