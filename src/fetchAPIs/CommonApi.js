import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import axios from 'axios';
const demoToken = 'ff0f2d93-006d-3aaa-94ec-05ee1a1ff2af';

const _getHeaders = async () => {
  const token = await AsyncStorage.getItem('access_token') || demoToken;
  return { token: token };
};

export const callApi = async (method, url, input) => {
  const headers = await _getHeaders();
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: headers,
      data: input,
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const callApiWithoutHeader = async (method, url, input) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      data: input,
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const callApiWithRawBody = async (method, url, input) => {
  let result = null;
  const config = {
    method: method,
    url: url,
    data: input,
  };
  console.log('request = ', JSON.stringify(config));
  await axios(config).then((response) => {
    console.log('response = ', JSON.stringify(response));
    result = response;
  }).catch((error) => {
    console.log('error = ', JSON.stringify(error));
    result = error;
  });
  return result;
};

export const callPostApi = async (url, input) => {
  return await callApi('post', url, input);
};

export const callGetApi = async (url, input) => {
  return await callApi('get', url, input);
};

export const callPutApi = async (url, input) => {
  return await callApi('put', url, input);
};

export const callPatchApi = async (url, input) => {
  return await callApi('patch', url, input);
};

export const callPostApiWithoutHeader = async (url, input) => {
  return await callApiWithoutHeader('post', url, input);
};

export const callPostApiWthRawBody = async (url, input) => {
  return await callApiWithRawBody('post', url, input);
};
export const callApiWithToken = async (method, url, token) => {
  console.log('url:' + url)
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: { "token": token },
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const callApiWithTokenAndRawBody = async (method, url, token, input) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: { "token": token },
      body: JSON.stringify(input)
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
        console.log(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};