import { callApiWithoutHeader, callApiWithRawBody, callPostApiWithoutHeader, callPostApiWthRawBody, callApiWithToken, callApiWithTokenAndRawBody } from './CommonApi';
import { LOGIN_URL, OTP_GET, REGIST_URL, LOGOUT_URL, ACCOUNT_UPDATE, FORGET_PASSWORD, CREATE_TRANS_PASSWORD, REQUEST_OTP_TRANS, RESET_TRANS_KEY } from '../api/Api';

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
export const forgetPassword = async (mobile, password, otp) => {
  const data = {
    mobile: mobile,
    new_password: password,
    otp: otp
  };
  return await callPostApiWthRawBody(FORGET_PASSWORD, data);
};
export const createTransPassword = async (password, token) => {
  const data = {
    new_trans_key: password
  }
  return await callApiWithTokenAndRawBody('post', CREATE_TRANS_PASSWORD, token, data);
};
export const requestOtpTrans = async (token) => {
  return await callApiWithToken('post', REQUEST_OTP_TRANS, token);
};

export const resetTransKey = async (otp, new_trans_key, token) => {
  const data = {
    new_trans_key: new_trans_key,
    otp: otp
  }
  return await callApiWithTokenAndRawBody('post', RESET_TRANS_KEY, token, data);
};