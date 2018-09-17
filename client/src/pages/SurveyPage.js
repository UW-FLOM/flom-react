import React, { Component } from 'react';
import { find } from 'lodash';
import styled from 'styled-components';

import { getSurveyDefinitions } from '../services/api';
import { Header, PlainText } from '../components/Typography';

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

  render() {
    const surveyDefinition = this.getSurvey();
    if(!surveyDefinition){
      return (
        <div>
          <Header>No survey found</Header>
          <PlainText>No survey found for specified ID</PlainText>
        </div>
      )
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
