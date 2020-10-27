import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SurveyListPage from './pages/SurveyListPage';
import SurveyPage from './pages/SurveyPage';
import Survey from './components/Survey';

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/surveys" component={SurveyListPage}/>
          <Route path="/survey/:surveyId/session/:sessionId/activity/:activityIdx" component={SurveyPage}/>
          <Route path="/survey/:surveyId/session/:sessionId" component={SurveyPage}/>
          <Route path="/survey/:surveyId" component={SurveyPage}/>
          <Route path="/survey" component={HomePage}/>
          <Route path="/survey-beta/:surveyId" component={Survey}/>
        </Switch>
      </div>
    );
  }
}

export default App;
