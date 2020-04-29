import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {getString} from '../res/values/String';

const demoToken = 'ff0f2d93-006d-3aaa-94ec-05ee1a1ff2af';
const NETWORK_ERROR = "network error";
const TIMEOUT_ERROR = 'timeout';
const TIME_OUT = 30000
const AXIOS = axios.create({
    timeout: TIME_OUT
})
const CancelToken = axios.CancelToken
let cancel

const _getHeader = async () => {
  const token = await AsyncStorage.getItem('access_token');
  if (token) {
    return {
      token: token
    };
  }
  return {
    token: demoToken
  };
};

export const callApi = async (method, url, input) => {
  let result = null;
  const headers = await _getHeader();
  const configs = {
    headers:headers,
    method: method,
    url: url,
    data: input,
    timeoutErrorMessage: TIMEOUT_ERROR,
    cancelToken: new CancelToken(function executor(cancellation) {
        cancel = cancellation;
    })
  };
  AXIOS.defaults.timeout = TIME_OUT;
  await AXIOS(configs).then((response)=>{
    result = _checkResponse(response)
  }).catch((error)=>{
    result = _checkError(error)
  });
  clearTimeout(timeOut)
  return result
};

const _checkResponse = async (response) => {
  console.log(JSON.stringify(response));
  console.log(response);
  return response.data || {code: -1, message: getString('UNKNOWN_ERROR'), data: null}
};

const _checkError = async (error) => {
  console.log(JSON.stringify(error?.response));
  let message = error?.response?.message || error?.response?.data?.message || getString('UNKNOWN_ERROR');
  if (!error) {
    return {code: -1, message: message, data: null}
  } else if (axios.isCancel(error)) {
    message = getString('SERVER_IS_TAKING_TOO_LONG_TO_RESPOND');
    return {code: -1, message: message, data: null}
  }
  switch (error.message.toLowerCase()) {
    case NETWORK_ERROR:
      message = getString('NO_INTERNET_CONNECTION');
      break;
    case TIMEOUT_ERROR:
      message = getString('SERVER_IS_TAKING_TOO_LONG_TO_RESPOND');
      break;
    default:
      break;
  }
  return {code: -1, message: message, data: null}
};

export const getApi = async (input, url) => {
  return await callApi('get', url, input)
};

export const postApi = async (input, url) => {
  return await callApi('post', url, input)
};

export const putApi = async (input, url) => {
  return await callApi('put', url, input)
};

export const patchApi = async (input, url) => {
  return await callApi('patch', url, input)
};

