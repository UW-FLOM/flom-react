
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
      text: args.text
    }),
  };  
  
  const response = await fetch('/api/echo', options);
  
  return response;
};