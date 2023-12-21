import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default function api(path, payload, method, isFormData, onUploadProgress) {
  return new Promise((resolve, reject) => {
    client
      .request({
        method: method,
        url: path,
        responseType: 'json',
        data: payload,
        ...(onUploadProgress && { onUploadProgress }),
      })
      .then((response) => {
        return resolve(response.data);
      })
      .catch((error) => {
        if (
          typeof error !== 'undefined' &&
          error !== null &&
          typeof error.response !== 'undefined' &&
          typeof error.response.data !== 'undefined'
        ) {
          return reject(error.response.data);
        } else {
          return reject(error);
        }
      });
  });
}
