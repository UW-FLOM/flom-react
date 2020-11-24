import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SurveyListPage from './pages/SurveyListPage';
import Survey from './pages/Survey';

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: '100%', height: '100%' }}>
        <Switch>
          <Route exact path="/" component={SurveyListPage}/>
          <Route path="/survey/:surveyId" component={Survey}/>
        </Switch>
      </div>
    );
  }
}

export default App;
