import React, { Component } from 'react';
import { find, has } from 'lodash';
import { Redirect } from 'react-router-dom';

import { Header, PlainText } from '../components/Typography';
import { getSurveyDefinitions, createSession } from '../services/api';
import Intro from '../components/Intro';
import FormActivity from '../components/FormActivity';

class HomePage extends Component {
  state = {
    surveyDefinitions: [],
    activity: null,
    redirect: false,
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

  handleSubmit = (answers) => {
    // TODO submit answers
    console.log('INFO: submitting answers:', JSON.stringify(answers));

    const nextActivityIdx = this.getActivityIndex() + 1;
    if ( nextActivityIdx >= this.getSurvey().activities.length){
      // TODO render the completion screen
      console.log('Survey complete');
    } else {
      this.setState({
        redirect: `/survey/${this.getSurveyId()}/session/${this.getSessionId()}/activity/${nextActivityIdx}`
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
        <Intro
          title={surveyDefinition.title}
          intro={surveyDefinition.intro}
          onBeginClick={this.handleBeginClick}
        />
      );
    }

    const currentActivity = surveyDefinition.activities[this.getActivityIndex()];

    if (currentActivity.type === 'form') {
      return (
        <FormActivity
          activity={currentActivity}
          onSubmit={this.handleSubmit}
        />
      );
    } else if (currentActivity.type === 'map'){
      return null;
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

export default HomePage;
