import 'cross-fetch';

// export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
//   process.env.BASE_URL || (`http://localhost:${process.env.PORT || 3000}/api`) :
//   '/api';

export const API_URL = 'http://localhost:8000/api';

export default function callApi(endpoint, method = 'get', body) {

  const headersObj = { 'content-type': 'application/json' };

  return fetch(`${API_URL}/${endpoint}`, {
    headers: headersObj,
    credentials: 'include',
    method,
    body: JSON.stringify(body)
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
}
