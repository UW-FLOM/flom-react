import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Survey = lazy(() => import('./pages/Survey')
  .then(({ default: Survey }) => ({ default: Survey })));

const SurveyListPage = lazy(() => import('./pages/SurveyListPage')
  .then(({ default: SurveyListPage }) => ({ default: SurveyListPage })));

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={(<Loading />)}
        >
          <Switch>
            <Route exact path="/" component={SurveyListPage} />
            <Route exact path="/survey/:surveyId" component={Survey} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
