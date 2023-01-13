import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { getSurvey, submitAnswer } from '../../services/api';
import PageRender from '../../components/PageRender';
import Loading from '../../components/Loading';

const IntroRender = lazy(() => import('../../components/IntroRender'));
const FormRender = lazy(() => import('../../components/FormRender'));
const EndRender = lazy(() => import('../../components/EndRender'));
const MapPage = lazy(() => import('../../components/MapRender'));
const Result = lazy(() => import('../../components/Result'));


function Survey(props) {
    const history = createBrowserHistory();
    const unblock = history.block();

    var { surveyId, isComplete} = useParams();
    const initialState = {
       surveyDefinition: {},
        currentPage: 0,
        response: {},
        isFetching: true,
        isComplete: false,
        isStart: false,
        startTime: 0,
        surveyLength: 0,
        surveyId: surveyId,
    }
console.log(surveyId);
    const [runSurvey, setRunSurvey] = useState(initialState);
    useEffect(() => {

        getSurvey(surveyId)
            .then((res) => {
                //console.log(res[0].detail);           
                setRunSurvey(setRunSurvey => ({...runSurvey, 
                  surveyDefinition: res[0].detail,
                  currentPage: 0,
                  surveyLength: res[0].detail.activities.length,
                  isFetching: false
                 }));
               // document.title = res[0].detail.title;
            })
            .catch((err) => console.log(err));
    }, []);

    const getSurveyDef = () => {
      return runSurvey.surveyDefinition;
    }

    const getSurveyId = () => {
        return runSurvey.surveyId;
    }

    // Returns the current activity based on the index
    const getActivity = () => {
        return getSurveyDef().activities[runSurvey.currentPage];
    }

    const updateResponse = (questionID, response) => {
        const activityID = getActivity().id;
        const currentResponse = runSurvey.response;
        currentResponse[activityID][questionID] = response;
        setRunSurvey(setRunSurvey => ({...runSurvey, response: currentResponse }));
    }

    const getResponse = (questionID) => {
        const { response } = runSurvey;
        if (!response[questionID]) {
            const currentResponse = runSurvey.response;
            currentResponse[questionID] = {};
            setRunSurvey(setRunSurvey => ({...runSurvey, response: currentResponse }));
        }
        return runSurvey.response;
    }

    const next = () => {
        const { currentPage: currentPage1 } = runSurvey;
        const currentPage = currentPage1 + 1;
        setRunSurvey(setRunSurvey => ({...runSurvey, currentPage: currentPage }));
        localStorage.setItem('currentPage', currentPage);
    }

    const start = () => {
        setRunSurvey(setRunSurvey => ({ ...runSurvey, isStart: true, startTime: Date.now() }));
    }

    // Check Check

    if (runSurvey.isFetching) {
        return null;
    }
    if (runSurvey.currentPage === getSurveyDef().activities.length) {
        localStorage.clear();
        if (!isComplete) {
            console.log('isComplete: ' + runSurvey.startTime)
            submitAnswer(getSurveyId(), runSurvey.response, runSurvey.startTime)
                .then(() => {
                    console.log('Submitted');
                    //setRunSurvey(setRunSurvey => ({ ...runSurvey, isComplete: true }));
                    isComplete = true;
                    unblock();
                })
                .catch((err) => console.log(err));
        }
        return (
            <Suspense fallback={<Loading />}>
                <Result
                    status="success"
                    title="Survey Complete"
                    subTitle="Thank you for participating!"
                />
            </Suspense>
        );
    }

    if (!runSurvey.isStart) {
        return (
            <Suspense fallback={<Loading />}>
                <IntroRender
                    title={runSurvey.surveyDefinition.title}
                    intro={runSurvey.surveyDefinition.intro}
                    onFinish={start}
                />
            </Suspense>
        );
    }

    const currentActivity = getActivity();
    const currentResponse = getResponse(currentActivity.id);

    if (currentActivity.type === 'form') {
      console.log(currentActivity.type)
        return (
            <Suspense fallback={<Loading />}>
                <PageRender
                    id={currentActivity.id}
                    current={runSurvey.currentPage + 1}
                    length={runSurvey.surveyLength}
                    title={currentActivity.title}
                    intro={currentActivity.intro}
                    progress
                >
                    <FormRender
                        questions={currentActivity.questions}
                        onChange={updateResponse}
                        values={currentResponse}
                        onFinish={next}
                    />
                </PageRender>
            </Suspense>
        );
    }
    if (currentActivity.type === 'map') {
      console.log(currentActivity.type)
        return (
            <Suspense fallback={<Loading />}>
                <MapPage
                    key="MapPage"
                    activity={currentActivity}
                    onChange={updateResponse}
                    onFinish={next}
                    values={currentResponse}
                    current={runSurvey.currentPage + 1}
                    length={runSurvey.surveyLength}
                    isComplete={isComplete}
                    progress
                />
            </Suspense>
        );
    }
    if (currentActivity.type === 'end') {
        console.log(currentActivity.type)
        return (
            <Suspense fallback={<Loading />}>
                <EndRender
                    id={currentActivity.id}
                    current={runSurvey.currentPage + 1}
                    length={runSurvey.surveyLength}
                    title={currentActivity.title}
                    intro={currentActivity.intro}
                    questions={currentActivity.questions}
                    onChange={updateResponse}
                    values={currentResponse}
                    isComplete={isComplete}
                    onFinish={next}
                    progress
                />
            </Suspense>
        );
    }
    console.log(currentActivity.type)
    return (
        <Suspense fallback={<Loading />}>
            <Result
                status="warning"
                title="Activity type not found"
                subTitle="The specified activity type does not exist."
            />
        </Suspense>
    );
}
//export default withParams(Survey);
export default Survey;