import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { getSurveyList } from '../services/api';
import PageRender from '../components/PageRender';

class SurveyListPage extends Component {
  state = {
    survey: []
  }

  // Get the survey definitions
  componentDidMount() {
    getSurveyList()
      .then(res => this.setState({ survey: res }))
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
            map(this.state.survey, (survey) => {
              return (
                <li key={survey.id}>
                  <Link to={`/survey/${survey.id}`}>{survey.name}</Link>
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
