import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { getSurveyDefinitions } from '../services/api';
import PageRender from '../components/PageRender';

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
      <PageRender
        steps={false}
        title={"Available Surveys"}
        intro={"Below are all available survey for development testing."}
      >
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
      </PageRender>
    );
  }
}

export default SurveyListPage;
