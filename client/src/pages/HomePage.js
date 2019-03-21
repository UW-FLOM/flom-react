import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  getSurveyDefinitions,
} from '../services/api';

class HomePage extends Component {
  state = {
    redirect: false,
    noSurveys: false
  }

  // When this page mounts, it fetches the survey definitions
  // so that it can redirect to the first survey found.
  componentDidMount() {
    getSurveyDefinitions()
      .then((surveys) => {

        if (!surveys || surveys.length < 1) {
          this.setState({ noSurveys: true });

        } else if (surveys.length === 1) {
          // If there is one survey, we redirect to it
          this.setState({
            redirect: `/survey/${surveys[0].id}`
          });

        } else {
          // If there are many surveys we redirect to the surveys page
          this.setState({
            redirect: `/surveys`
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    // The landing page re-directs to surveys
    // This is where you would put a real home page if
    // you wanted to see that before a survey
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return null;
  }
}

export default HomePage;
