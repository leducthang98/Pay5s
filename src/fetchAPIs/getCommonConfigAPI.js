import { COMMON_CONFIG } from "../api/Api";

export default function GetCommonConfigAPI() {
  return new Promise((resolve, reject) => {

    const url = COMMON_CONFIG
    fetch(url, {
      method: "GET",
      headers: {"token":"ff0f2d93-006d-3aaa-94ec-05ee1a1ff2af"},
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
