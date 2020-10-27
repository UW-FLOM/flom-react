import React, { Component } from 'react';
import { constant, find, has } from 'lodash';
import { Result } from 'antd';

import { Layout as FormLayout, MapLayout } from "../components/Layout";

import {
  getSurveyDefinitions,
  createSession,
  updateSession,
  submitAnswers,
} from '../services/api';
import Intro from '../components/Intro';
import FormActivity from '../activities/FormActivity';
import MapActivity from '../activities/MapActivity';
import StepsRender from '../components/StepsRender';

import { idFromString } from '../util';

class Survey extends Component {
  state = {
    surveyDefinitions: [],
    activity: null,
    redirect: false,
    surveyComplete: false,
    current: 0,
    surveyStart: false,
  };

  componentDidMount() {
    getSurveyDefinitions()
      .then((res) =>
        this.setState({
          surveyDefinitions: res,
        })
      )
      .catch((err) => console.log(err));
  }

  static getDerivedStateFromProps(props, state) {
    // If the current location equals the location store in state.redirect,
    // set redirect to false. We are now on the page we need and no redirect is required
    if (
      has(props, 'location.pathname') &&
      props.location.pathname === state.redirect
    ) {
      return {
        ...state,
        redirect: false,
      };
    }
    return state;
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

  getSessionId() {
    return this.props.match.params.sessionId;
  }

  getActivityIndex() {
    return parseInt(this.props.match.params.activityIdx, 10);
  }

  // Returns the current activity based on the index in the URL
  getActivity() {
    return this.getSurvey().activities[this.state.current];
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  // Called to begin a survey. This calls out to the database to create a session,
  // then re-directs to the session URL
  start() {
    this.setState({ surveyStart: true });
  }

  // handleSubmit is passed to the activities and they call it when the user submits
  // answers. It submits the answers tothe server, then redirects to the next activity.
  // If there are no more activities, it marks the survey as complete and calls
  // updateSession to mark the session as complete.
  handleSubmit = async (questions) => {
    console.log('INFO: submitting answers:', JSON.stringify(questions));

    const surveyId = this.getSurveyId();
    const sessionId = this.getSessionId();
    const activityIndex = this.getActivityIndex();

    const currentActivity = this.getActivity();

    try {
      await submitAnswers({
        sessionId,
        activityIndex,
        title: idFromString(currentActivity.title),
        type: currentActivity.type,
        responses: questions,
      });
    } catch (error) {
      console.log('ERROR: ', error);
    }

    const nextActivityIdx = activityIndex + 1;

    // If there are no more activities, mark the session complete
    if (nextActivityIdx >= this.getSurvey().activities.length) {
      this.setState({ surveyComplete: true });
      try {
        await updateSession(sessionId, { sessionComplete: true });
      } catch (error) {
        console.log('ERROR: ', error);
      }
      // else, there are more activities, redirect to the next one
    } else {
      this.setState({
        redirect: `/survey/${surveyId}/session/${sessionId}/activity/${nextActivityIdx}`,
      });
    }
  };

  render() {
    // If no survey is defined, we render nothing. This shouldn't happen.
    // It's possible it should render an error message instead
    const surveyDefinition = this.getSurvey();
    if (!surveyDefinition) {
      return null;
    }

    if (!this.state.surveyStart) {
      return (
        <FormLayout>
            <Intro
              title={surveyDefinition.title}
              intro={surveyDefinition.intro}
              startButtonText={surveyDefinition.startText}
              onBeginClick={() => this.start()}
            />
        </FormLayout>
      );
    } else {
      if (this.state.current === this.getSurvey().activities.length) {
        return (
          <Result
            status="success"
            title="Survey Complete"
            subTitle="Thank you for participating!"
          />
        );
      }

      const currentActivity = this.getActivity();

      console.log(this.getSurvey().activities);

      if (currentActivity.type === 'form') {
        return (
          <FormLayout>
            <StepsRender
                current={this.state.current}
                steps={this.getSurvey().activities}
            />
            <FormActivity
                activity={currentActivity}
                onSubmit={() => this.next()}
            />
          </FormLayout>
        );
      } else if (currentActivity.type === 'map') {
        return (
          <MapLayout>
            <StepsRender
                current={this.state.current}
                steps={this.getSurvey().activities}
            />
            <MapActivity
              activity={currentActivity}
              onSubmit={() => this.next()}
            />
          </MapLayout>
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
