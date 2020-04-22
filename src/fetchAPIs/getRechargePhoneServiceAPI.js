import { PHONE_SERVICE_LIST } from "../api/Api";
import {callGetApi} from './CommonApi';

export const getRechargePhoneServiceAPI = async () => {
  return await callGetApi(PHONE_SERVICE_LIST)
};


// export default function GetRechargePhoneServiceAPI(token_user) {
//   return new Promise((resolve, reject) => {
//
//     const url = PHONE_SERVICE_LIST
//     fetch(url, {
//       method: "GET",
//       headers: {"token":token_user},
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         resolve(res);
//         console.log('response = ', JSON.parse(res))
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
