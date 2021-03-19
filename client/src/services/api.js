export const getServerTest = async () => {
  const response = await fetch('/api/hello');
  const body = await response.json();

  if (response.status !== 200) throw Error(body.message);

  return body;
};

export const logPostBody = async (args) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: args.text,
    }),
  };

  const response = await fetch('/api/echo', options);

  return response.json();
};

export const getSurveyList = async () => {
  const response = await fetch('/api/survey');
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

export const getSurvey = async (args) => {
  const response = await fetch(`/api/survey/${args}`);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

export const submitAnswer = async (surveyID, args) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...args,
    }),
  };

  const response = await fetch(`/api/submission/${surveyID}`, options);
  return response.json();
};
