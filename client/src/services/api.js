import auth from './auth';
import authHeader from './authHeader';

/*export const getServerTest = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
};*/

/*export const logPostBody = async (args) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            text: args.text,
        }),
    };

    const response = await fetch('/api/echo', options);

    return response.json();
};*/

export const verifyUser = async (token) => {
    console.log('Client: api.js ', token);
    const response = await fetch('/api/user/verify', { headers: {'token':token}});
    return response.json();
};

export const getSurveyList = async () => {
    console.log('Client: api.js');
    const response = await fetch('/api/survey');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('getSurveyList: ', body);
    return body;
};

export const getSurvey = async (args) => {
    const response = await fetch(`/api/survey/${args}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
};

// Survey submission for Survey
export const submitAnswer = async (surveyID, args, startTime) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            timeStamp: startTime,
            data: args,
        }),
    };

    const response = await fetch(`/api/submission/${surveyID}`, options);
    return response.json();
};


// New file upload for SurveyAddPage
export const surveyAddPageUpload = async (data) => {
    console.log(data)
    const options = {
        headers: authHeader(),
        method: 'POST',
        body: data,
    };

    await fetch('/api/upload', options)
        .catch(error => console.log('error', error));

};

// New survey data for SurveyAddPage
export const surveyModify = async (data, mode) => {

    const options = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data,
            "mode": mode
        }),
    };

    await fetch('/api/addSurvey/', options)
        .then(function (response) {
            if (response.status === 201) {
                return location.reload();
            } else {
                if (response.status === 400) {
                    response.json().then(function (object) {
                        return alert(`Bad Request:  ${object.detail}`);
                    })
                }
            }
        })
};