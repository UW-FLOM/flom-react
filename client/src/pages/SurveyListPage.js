import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { getSurveyDefinitions } from '../services/api';

import { Layout } from '../components/Layout';

import { Header } from '../components/Typography';

class SurveyListPage extends Component {
  state = {
    surveyDefinitions: []
  }

  // Get the survey definitions
  componentDidMount() {
    getSurveyDefinitions()
      .then(res => this.setState({ surveyDefinitions: res }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Layout>
        <Header>Available Surveys</Header>

        <ul>
          {
            // Render a list of links
            map(this.state.surveyDefinitions, (survey) => {
              return (
                <li key={survey.id}>
                  <Link to={`/survey/${survey.id}`}>{survey.title}</Link>
                </li>
              );
            })
          }
        </ul>
      </Layout>
    );
  }
}

export default SurveyListPage;
