import React, { Component } from 'react';
import { constant, find, has } from 'lodash';
import { Result, Layout } from 'antd';

import {
  getSurveyDefinitions,
} from '../services/api';
import Intro from '../components/Intro';
import FormPage from '../pages/FormPage';
import MapPage from '../pages/MapPage';
import StepsRender from '../components/StepsRender';

const { Header, Content } = Layout;

class Survey extends Component {

  constructor(props) {
    super(props);

    var storedSurveyDefinitions = {};
    var storedCurrentPage = 0;
    var storedSurveyStart = false;
    var storedResponse = {};
    var storedSurveyID = this.props.match.params.surveyId;

    if(localStorage.getItem("surveyID") === storedSurveyID) {
      storedSurveyDefinitions = JSON.parse(localStorage.getItem("surveyDefinitions"));
      storedCurrentPage = parseInt(localStorage.getItem("currentPage"));
      storedSurveyStart = localStorage.getItem("surveyStart") === 'true';
      storedResponse = JSON.parse(localStorage.getItem("response"));
    } else {
      localStorage.clear();
      localStorage.setItem("surveyID", storedSurveyID);
      localStorage.setItem("surveyDefinitions", JSON.stringify(storedSurveyDefinitions));
      localStorage.setItem("currentPage", storedCurrentPage);
      localStorage.setItem("surveyStart", "false");
      localStorage.setItem("response", JSON.stringify(storedResponse));
    }

    this.state = {
      surveyDefinitions: storedSurveyDefinitions,
      currentPage: storedCurrentPage,
      surveyStart: storedSurveyStart,
      response: storedResponse
    };

    this.updateResponse = this.updateResponse.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    let self = this;
    getSurveyDefinitions()
      .then(function(res) {
          self.setState({
            surveyDefinitions: res,
          });
          localStorage.setItem("surveyDefinitions", JSON.stringify(res));
        }
      )
      .catch((err) => console.log(err));
   }

  // Get the current survey based on URL params
  getSurvey() {
    return find(this.state.surveyDefinitions, [
      'id',
      this.props.match.params.surveyId,
    ]);
  }

  getSurveyId() {
    return this.props.match.params.surveyId;
  }

  // Returns the current activity based on the index
  getActivity() {
    return this.getSurvey().activities[this.state.currentPage];
  }

  next() {
    console.log("I happened");
    const currentPage = this.state.currentPage + 1;
    this.setState({ currentPage });
    localStorage.setItem("currentPage", currentPage);
  }

  // Called to begin a survey. This calls out to the database to create a session,
  // then re-directs to the session URL
  start() {
    this.setState({ surveyStart: true });
    localStorage.setItem("surveyStart", "true");
  }

  updateResponse(questionID, response) {
    var currentResponse = this.state.response;
    currentResponse[questionID] = response;
    this.setState({ response: currentResponse });
    localStorage.setItem("response", JSON.stringify(currentResponse));
  }

  render() {
    const surveyDefinition = this.getSurvey();
    if (!surveyDefinition) {
      return null;
    }

    if (!this.state.surveyStart) {
      return (
        <Layout
            style={{
              margin: 'auto',
              width: '900px',
              height: '100%',
              background: 'none',
            }}
          >
            <Content>
              <Intro
                title={surveyDefinition.title}
                intro={surveyDefinition.intro}
                startButtonText={surveyDefinition.startText}
                onBeginClick={() => this.start()}
              />
            </Content>
        </Layout>
      );
    } else {
      if (this.state.currentPage === this.getSurvey().activities.length) {
        localStorage.clear();
        return (
          <Result
            status="success"
            title="Survey Complete"
            subTitle="Thank you for participating!"
          >
            <div>
              {JSON.stringify(this.state.response)}
            </div>
          </Result>
        );
      }

      const currentActivity = this.getActivity();
      const currentResponse = this.state.response;

      if (currentActivity.type === 'form') {
        return (
          <Layout
            style={{
              margin: 'auto',
              width: '900px',
              height: '100%',
              background: 'none',
            }}
          >
            <Header
              style={{
                background: 'none',
              }}
            >
              <StepsRender
                  current={this.state.currentPage}
                  steps={this.getSurvey().activities}
              />
            </Header>
            <Content
              style={{
                padding: '0 50px',
              }}
            >
              <FormPage
                  activity={currentActivity}
                  onFinish={this.next}
                  onUpdate={this.updateResponse}
                  values={currentResponse}
              />
            </Content>
          </Layout>
        );
      } else if (currentActivity.type === 'map') {
        return (
          <Layout
            style={{
              background: 'none',
              height: '100vh',
            }}
          >
            <Header
              style={{
                background: 'none',
                padding: '10px 50px',
              }}
            >
              <StepsRender
                  current={this.state.currentPage}
                  steps={this.getSurvey().activities}
              />
            </Header>
            <Content>
              <MapPage
                activity={currentActivity}
                onUpdate={this.updateResponse}
                onFinish={this.next}
                values={currentResponse}
              />
            </Content>
          </Layout>
        );
      } else {
        return (
          <Result
            status="warning"
            title="Activity type not found"
            subTitle="The specified activity type does not exist."
          />
        );
      }
    }
  }
}

export default Survey;
