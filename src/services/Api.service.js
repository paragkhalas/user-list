import axios from 'axios';
const config = {
  api: 'https://randomuser.me/api',
  options: {
    headers: { 'content-type': 'application/json' },
  },
};

const httpGet = (endpoint) => {
  return axios(`${config.api}${endpoint}`, {
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw Error(response.data | 'error');
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { httpGet };