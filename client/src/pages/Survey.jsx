import React, { Component, lazy, Suspense } from 'react';

import { getSurvey, submitAnswer } from '../services/api';
import PageRender from '../components/PageRender';
import Loading from '../components/Loading';

const IntroRender = lazy(() => import('../components/IntroRender')
  .then(({ default: IntroRender }) => ({ default: IntroRender })));
const FormRender = lazy(() => import('../components/FormRender')
  .then(({ default: FormRender }) => ({ default: FormRender })));
const EndRender = lazy(() => import('../components/EndRender')
  .then(({ default: EndRender }) => ({ default: EndRender })));
const MapPage = lazy(() => import('./MapPage')
  .then(({ default: MapPage }) => ({ default: MapPage })));
const Result = lazy(() => import('../components/Result')
  .then(({ default: Result }) => ({ default: Result })));

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
    return (
      <Suspense fallback={<Loading />}>
        <Result
          status="warning"
          title="Activity type not found"
          subTitle="The specified activity type does not exist."
        />
      </Suspense>
    );
  }
}

export default Survey;
