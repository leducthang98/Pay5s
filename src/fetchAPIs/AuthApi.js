import { callApiWithoutHeader, callApiWithRawBody, callPostApiWithoutHeader, callPostApiWthRawBody } from './CommonApi';
import { LOGIN_URL, OTP_GET,REGIST_URL } from '../api/Api';

export const login = async (username, password) => {
  const data = {
    user: username,
    pass: password
  };
  return await callPostApiWthRawBody(LOGIN_URL, data);
};
export const getOTP = async (mobile) => {
  const data = {
    mobile: mobile
  };
  return await callPostApiWthRawBody(OTP_GET + data.mobile, data);
};
export const regist = async (mobile, password,otp) => {
  const data = {
    mobile: mobile,
    password: password,
    otp:otp
  };
  return await callPostApiWthRawBody(REGIST_URL, data);
};