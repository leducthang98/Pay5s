import { COMMON_CONFIG } from "../api/Api";

export default function GetCommonConfigAPI(token_user) {
  return new Promise((resolve, reject) => {

    const url = COMMON_CONFIG
    fetch(url, {
      method: "GET",
      headers: {"token":token_user},
    })
      .then((response) => response.json())
      .then((res) => {

        resolve(res);
        console.log(res)
      })
      .catch((error) => {
        reject(error);
      });
  });
}
