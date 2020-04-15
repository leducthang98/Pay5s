import {callApiWithoutHeader, callApiWithRawBody, callPostApiWithoutHeader, callPostApiWthRawBody} from './CommonApi';
import {LOGIN_URL} from '../api/Api';

export const login = async (username, password) => {
  const data = {
    user: username,
    pass: password
  };
  return await callPostApiWthRawBody(LOGIN_URL, data);
};
