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
import FormActivity from '../components/FormActivity';
import MapActivity from '../components/MapActivity';
import RandomAudioActivity from '../components/RandomAudioActvity';

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

  getActivity() {
    return this.getSurvey().activities[this.getActivityIndex()];
  }

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
    if ( nextActivityIdx >= this.getSurvey().activities.length){
      this.setState({ surveyComplete: true });
      try {
        await updateSession(sessionId, { sessionComplete: true });
      }
      catch (error) {
        console.log('ERROR: ', error);
      }
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

    const surveyDefinition = this.getSurvey();
    if (!surveyDefinition) {
      return null;
    }

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
    } else if (currentActivity.type === 'randoAudio') {
      return (
        <FormLayout>
          <RandomAudioActivity
            activity={currentActivity}
            onSubmit={this.handleSubmit}
          />
        </FormLayout>
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
