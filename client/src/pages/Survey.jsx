import React, { Component } from 'react';
import { Result } from 'antd';

import { getSurvey, submitAnswer } from '../services/api';
import MapPage from './MapPage';
import PageRender from '../components/PageRender';
import FormRender from '../components/FormRender';
import IntroRender from '../components/IntroRender';
import EndRender from '../components/EndRender';

class Survey extends Component {
  constructor(props) {
    super(props);

    const storedSurveyDefinitions = {};
    const storedCurrentPage = 0;
    const storedResponse = {};

    /*
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
    */

    this.state = {
      surveyDefinition: storedSurveyDefinitions,
      currentPage: storedCurrentPage,
      response: storedResponse,
      isFetching: true,
      isComplete: false,
      isStart: false,
      surveyLength: 0,
    };

    this.updateResponse = this.updateResponse.bind(this);
    this.next = this.next.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    const self = this;
    getSurvey(this.props.match.params.surveyId)
      .then((res) => {
        console.log(res[0].detail);
        self.setState({
          surveyDefinition: res[0].detail,
          isFetching: false,
          surveyLength: res[0].detail.activities.length,
        });
        document.title = res[0].detail.title;
      })
      .catch((err) => console.log(err));
  }

  getSurvey() {
    return this.state.surveyDefinition;
  }

  getSurveyId() {
    return this.props.match.params.surveyId;
  }

  // Returns the current activity based on the index
  getActivity() {
    return this.getSurvey().activities[this.state.currentPage];
  }

  updateResponse(questionID, response) {
    const activityID = this.getActivity().id;
    const currentResponse = this.state.response;
    currentResponse[activityID][questionID] = response;
    this.setState({ response: currentResponse });
  }

  getResponse(questionID) {
    const { response } = this.state;
    if (!response[questionID]) {
      const currentResponse = this.state.response;
      currentResponse[questionID] = {};
      this.setState({ response: currentResponse });
    }
    return response;
  }

  next() {
    const { currentPage: currentPage1 } = this.state;
    const currentPage = currentPage1 + 1;
    this.setState({ currentPage });
    localStorage.setItem('currentPage', currentPage);
  }

  start() {
    this.setState({ isStart: true });
  }

  render() {
    const {
      currentPage, isFetching, surveyLength, isStart, surveyDefinition, isComplete,
    } = this.state;
    if (isFetching) {
      return null;
    }
    if (currentPage === this.getSurvey().activities.length) {
      localStorage.clear();
      if (!isComplete) {
        submitAnswer(this.getSurveyId(), this.state.response)
          .then(() => {
            console.log('Submitted');
            this.setState({
              isComplete: true,
            });
          })
          .catch((err) => console.log(err));
      }
      return (
        <Result
          status="success"
          title="Survey Complete"
          subTitle="Thank you for participating!"
        />
      );
    }

    if (!isStart) {
      return (
        <IntroRender
          title={surveyDefinition.title}
          intro={surveyDefinition.intro}
          onFinish={this.start}
        />
      );
    }

    const currentActivity = this.getActivity();
    const currentResponse = this.getResponse(currentActivity.id);

    if (currentActivity.type === 'form') {
      return (
        <PageRender
          id={currentActivity.id}
          current={currentPage + 1}
          length={surveyLength}
          title={currentActivity.title}
          intro={currentActivity.intro}
          progress
        >
          <FormRender
            questions={currentActivity.questions}
            onChange={this.updateResponse}
            values={currentResponse}
            onFinish={this.next}
          />
        </PageRender>
      );
    }
    if (currentActivity.type === 'map') {
      return (
        <MapPage
          key="MapPage"
          activity={currentActivity}
          onChange={this.updateResponse}
          onFinish={this.next}
          values={currentResponse}
          current={currentPage + 1}
          length={surveyLength}
          progress
        />
      );
    }
    if (currentActivity.type === 'end') {
      return (
        <EndRender
          id={currentActivity.id}
          current={currentPage + 1}
          length={surveyLength}
          title={currentActivity.title}
          intro={currentActivity.intro}
          questions={currentActivity.questions}
          onChange={this.updateResponse}
          values={currentResponse}
          onFinish={this.next}
          progress
        />
      );
    }
    return (
      <Result
        status="warning"
        title="Activity type not found"
        subTitle="The specified activity type does not exist."
      />
    );
  }
}

export default Survey;
