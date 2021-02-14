import React, { Component } from 'react';
import { find } from 'lodash';
import { Result } from 'antd';

import { submitAnswer, getSurvey } from '../services/api';
import MapPage from './MapPage';
import PageRender from '../components/PageRender';
import FormRender from '../components/FormRender';

class Survey extends Component {
  constructor(props) {
    super(props);

    const storedSurveyDefinitions = {};
    const storedCurrentPage = 0;
    const storedSurveyStart = false;
    const storedResponse = {};
    const storedSurveyID = this.props.match.params.surveyId;

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
    };

    this.updateResponse = this.updateResponse.bind(this);
    this.next = this.next.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }

  componentDidMount() {
    const self = this;
    getSurvey(this.props.match.params.surveyId)
      .then((res) => {
        self.setState({
          surveyDefinition: res.content,
          isFetching: false,
        });
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

  next() {
    const currentPage = this.state.currentPage + 1;
    this.setState({ currentPage });
    localStorage.setItem('currentPage', currentPage);
  }

  updateResponse(questionID, response) {
    const activityID = this.getActivity().id;
    const currentResponse = this.state.response;
    currentResponse[activityID][questionID] = response;
    this.setState({ response: currentResponse });
    console.log(this.state.response);
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

  render() {
    const { currentPage, response, isFetching } = this.state;
    if (isFetching) {
      return null;
    }
    if (currentPage === this.getSurvey().activities.length) {
      localStorage.clear();
      submitAnswer(this.getSurveyId(), this.state.response);
      return (
        <Result
          status="success"
          title="Survey Complete"
          subTitle="Thank you for participating!"
        />
      );
    }

    const currentActivity = this.getActivity();
    const currentResponse = this.getResponse(currentActivity.id);

    if (currentActivity.type === 'intro') {
      return (
        <PageRender
          title={currentActivity.title}
          intro={currentActivity.intro}
        >
          <h1>Hello</h1>
        </PageRender>
      );
    }

    if (currentActivity.type === 'form') {
      return (
        <PageRender
          currentPage={this.state.currentPage}
          activities={this.getSurvey().activities}
          steps
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
        <PageRender
          currentPage={this.state.currentPage}
          activities={this.getSurvey().activities}
          steps
          type="map"
        >
          <MapPage
            key="MapPage"
            activity={currentActivity}
            onChange={this.updateResponse}
            onFinish={this.next}
            values={currentResponse}
          />
        </PageRender>
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
