import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Verifies route authorization before passing child route
import { AuthGate } from './components/AuthGate'

import {
    DashboardPage,
    HomePage,
    LoginPage,
    SurveyListPage,
    SurveyDetailPage,
    SurveyAddPage,
} from './pages';

const Survey = lazy(() => import('./pages/Survey'));

// This component handles routing. Rendering the page specified
// for each URL listed in the Switch below.
function App() {
    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path={'/survey/:surveyId'} element={<Survey />} />

                    <Route path='dashboard/surveyAdd' element={
                        <AuthGate type='route'>
                            <SurveyAddPage />
                        </AuthGate>
                    } />
                    <Route path='/dashboard' element={
                        <AuthGate type='route' >
                            <DashboardPage />
                        </AuthGate>
                    } />
                    <Route path='/dashboard/survey' element={
                        <AuthGate type='route'>
                            <SurveyListPage />
                        </AuthGate>
                    } />
                    <Route path={"/dashboard/survey/:surveyId"} element={
                        <AuthGate type='route' >
                            <SurveyDetailPage />
                        </AuthGate>
                    } />

                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
