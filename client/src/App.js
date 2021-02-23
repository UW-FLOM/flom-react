import React, { useState, useEffect, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SurveyListPage from './pages/SurveyListPage';
import Survey from './pages/Survey';
import useWindowDimensions from './useWindowDimensions';
import './App.css';

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
export default function App() {
  const { height, width } = useWindowDimensions();
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={SurveyListPage} />
        <Route exact path="/survey/:surveyId" component={Survey} />
      </Switch>
    </div>
  );
}
