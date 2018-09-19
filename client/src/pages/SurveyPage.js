import React, { Component } from 'react';
import { find } from 'lodash';
import styled from 'styled-components';

import { getSurveyDefinitions, createSession } from '../services/api';
import { Header, PlainText } from '../components/Typography';
import Intro from '../components/Intro';

const HighlightedText = styled(PlainText)`
  color: steelblue;
`

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

    return (
      <div>
        <Header>{surveyDefinition.title}</Header>
        <HighlightedText>Survery data:</HighlightedText>
        <PlainText>
          {JSON.stringify(surveyDefinition)}
        </PlainText>
      </div>
    );
  }
}

export default HomePage;
