import { PHONE_SERVICE_LIST } from "../api/Api";
import {callGetApi} from './CommonApi';

export const getRechargePhoneServiceAPI = async () => {
  return await callGetApi(PHONE_SERVICE_LIST)
};
