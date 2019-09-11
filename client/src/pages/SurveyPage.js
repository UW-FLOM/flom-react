import React, { Component } from 'react';
import { find, has } from 'lodash';
import { Redirect } from 'react-router-dom';

import { Layout as FormLayout, MapLayout } from '../components/Layout';
import { Header, PlainText } from '../components/Typography';
import {
  getSurveyDefinitions,
  createSession,
  updateSession,
  submitAnswers
} from '../services/api';
import Intro from '../components/Intro';
import FormActivity from '../activities/FormActivity';
import MapActivity from '../activities/MapActivity';
import MapAudioActivity from '../activities/MapAudioActivity';

import RandomAudioActivity from '../activities/RandomAudioActvity';

import { idFromString } from '../util';

class SurveyPage extends Component {
  state = {
    surveyDefinitions: [],
    activity: null,
    redirect: false,
    surveyComplete: false
  }

  componentDidMount() {
    getSurveyDefinitions()
      .then(res => this.setState({
        surveyDefinitions: res
      }))
      .catch(err => console.log(err));
  }

  static getDerivedStateFromProps(props, state) {
    // If the current location equals the location store in state.redirect,
    // set redirect to false. We are now on the page we need and no redirect is required
    if (has(props, 'location.pathname') && props.location.pathname === state.redirect) {
      return {
        ...state,
        redirect: false
      };
    }
    return state;
  }

  // Get the current survey based on URL params
  getSurvey() {
    return find(this.state.surveyDefinitions, ['id', this.props.match.params.surveyId]);
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
    return this.getSurvey().activities[this.getActivityIndex()];
  }

  // Called to begin a survey. This calls out to the database to create a session,
  // then re-directs to the session URL
  handleBeginClick = () => {
    createSession()
      .then((res) => {
        // Here we replace instead of redirect so that the accept
        // screen doesn't end up in the browser history
        window.location.replace(
          `/survey/${this.getSurveyId()}/session/${res.id}/activity/0`
        );
      })
      .catch(err => console.log(err));
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
    }
    catch (error) {
      console.log('ERROR: ', error);
    }

    const nextActivityIdx = activityIndex + 1;

    // If there are no more activities, mark the session complete
    if ( nextActivityIdx >= this.getSurvey().activities.length){
      this.setState({ surveyComplete: true });
      try {
        await updateSession(sessionId, { sessionComplete: true });
      }
      catch (error) {
        console.log('ERROR: ', error);
      }
    // else, there are more activities, redirect to the next one
    } else {
      this.setState({
        redirect: `/survey/${surveyId}/session/${sessionId}/activity/${nextActivityIdx}`
      });
    }
  }

  render() {
    // We put redirect paths in the state when its time to move to the next page.
    // If there is a redirect path in state, we render a rediect.
    // This is a bit of an oddness of react router.
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: { redirect: null }
      }} push />;
    }

    // If no survey is defined, we render nothing. This shouldn't happen.
    // It's possible it should render an error message instead
    const surveyDefinition = this.getSurvey();
    if (!surveyDefinition) {
      return null;
    }

    // If there is no sessionId, this is the users first visit to the survey,
    // We show the intro, passing a handler to begin the survey
    if (!this.getSessionId()) {
      return (
        <FormLayout>
          <Intro
            title={surveyDefinition.title}
            intro={surveyDefinition.intro}
            startButtonText={surveyDefinition.startText}
            onBeginClick={this.handleBeginClick}
          />
        </FormLayout>
      );
    }

    // If the survey is complete, we show the end screen.
    if (this.state.surveyComplete) {
      return(
        <FormLayout>
          <Header>Survey Complete</Header>
          <PlainText>Thank you for participating!</PlainText>
        </FormLayout>
      );
    }

    const currentActivity = this.getActivity();

    if (currentActivity.type === 'form') {
      return (
        <FormLayout>
          <FormActivity
            activity={currentActivity}
            onSubmit={this.handleSubmit}
          />
        </FormLayout>
      );
    } else if (currentActivity.type === 'map') {
      return (
        <MapLayout>
          <MapActivity
            activity={currentActivity}
            onSubmit={this.handleSubmit}
          />
        </MapLayout>
      );
    } else if (currentActivity.type === 'randomAudio') {
      return (
        <FormLayout>
          <RandomAudioActivity
            activity={currentActivity}
            onSubmit={this.handleSubmit}
          />
        </FormLayout>
      );
    } else if (currentActivity.type === 'mapAudio') {
      return (
        <MapLayout>
          <MapAudioActivity
            activity={currentActivity}
            onSubmit={this.handleSubmit}
          />
        </MapLayout>
      );
    } else {
      return (
        <div>
          <Header>Activity type not found</Header>
          <PlainText>The specified activity type does not exist.</PlainText>
        </div>
      );
    }
  }
}

export default SurveyPage;
