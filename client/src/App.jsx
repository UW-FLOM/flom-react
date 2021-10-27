import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'

const Survey = lazy(() => import('./pages/Survey')
  .then(({ default: Survey }) => ({ default: Survey })));

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Suspense fallback={(<Loading />)}>
            <Route exact path="/survey/:surveyId" component={Survey} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
