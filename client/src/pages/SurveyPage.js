import React, { Component } from 'react';
import { find } from 'lodash';

import { getSurveyDefinitions, createSession } from '../services/api';
import Intro from '../components/Intro';
import FormActivity from '../components/FormActivity';

class HomePage extends Component {
  state = {
    surveyDefinitions: []
  }
  
  componentDidMount() {
    getSurveyDefinitions()
      .then(res => this.setState({ surveyDefinitions: res }))
      .catch(err => console.log(err));
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

  handleBeginClick = () => {
    createSession()
      .then((res) => {
        window.location.replace(`/survey/${this.getSurveyId()}/session/${res.id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
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
    console.log('Rendering survey: ', JSON.stringify(surveyDefinition));
    
    return (
      <div>
        <FormActivity
          activity={surveyDefinition.activities[0]}
        />
      </div>
    );
  }
}

export default HomePage;
