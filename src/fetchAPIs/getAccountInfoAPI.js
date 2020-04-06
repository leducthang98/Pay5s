import { BASE_URL } from "../api/EndPoint";

export default function getAccountInfoAPI() {
  return new Promise((resolve, reject) => {

    const url = BASE_URL
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
