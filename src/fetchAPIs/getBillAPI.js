import { BILL_GET } from "../api/Api";

export default function GetBillAPI(token_user) {
  return new Promise((resolve, reject) => {
    const url = BILL_GET
    fetch(url, {
      method: "GET",
      headers: { "token": token_user },

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
