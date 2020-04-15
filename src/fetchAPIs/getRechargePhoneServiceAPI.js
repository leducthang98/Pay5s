import { PHONE_SERVICE_LIST } from "../api/Api";

export default function GetRechargePhoneServiceAPI() {
  return new Promise((resolve, reject) => {

    const url = PHONE_SERVICE_LIST
    fetch(url, {
      method: "GET",
      headers: {"token":"ff0f2d93-006d-3aaa-94ec-05ee1a1ff2af"},
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
        console.log('response = ', JSON.parse(res))
      })
      .catch((error) => {
        reject(error);
      });
  });
}
