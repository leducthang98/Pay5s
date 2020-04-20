import { callApiWithoutHeader, callApiWithRawBody, callPostApiWithoutHeader, callPostApiWthRawBody, callApiWithToken, callApiWithTokenAndRawBody } from './CommonApi';
import { LOGIN_URL, OTP_GET, REGIST_URL, LOGOUT_URL, ACCOUNT_UPDATE } from '../api/Api';

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
export const regist = async (mobile, password, otp) => {
  const data = {
    mobile: mobile,
    password: password,
    otp: otp
  };
  return await callPostApiWthRawBody(REGIST_URL, data);
};
export const logout = async (token) => {
  return await callApiWithToken('post', LOGOUT_URL, token)
};

export const updateAccount = async (token, fullname, dob, gender, email, address) => {
  const data = {
    fullname: fullname,
    dob: dob,
    gender: gender,
    email: email,
    address: address
  };
  return await callApiWithTokenAndRawBody('post', ACCOUNT_UPDATE, token, data);
};