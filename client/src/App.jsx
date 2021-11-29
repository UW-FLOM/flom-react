import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Loading';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  DashboardPage, HomePage, LoginPage, SurveyListPage, SurveyDetailPage,
} from './pages';

const Survey = lazy(() => import('./pages/Survey'));

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/dashboard/survey" component={SurveyListPage} />
          <Route exact path="/dashboard/survey/:surveyId" component={SurveyDetailPage} />
          <Suspense fallback={(<Index />)}>
            <Route exact path="/survey/:surveyId" component={Survey} />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
