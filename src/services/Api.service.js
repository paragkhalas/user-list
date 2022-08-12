import axios from 'axios';

const config = {
  api: process.env.REACT_APP_API_BASE,
  options: {
    headers: { 'content-type': 'application/json' },
  },
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  }
  throw Error(response.data ? response.data : 'error');
};

const httpGet = (endpoint) => {
  return axios(`${config.api}${endpoint}`, {
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      throw Error(error);
    });
};

export default { httpGet };
