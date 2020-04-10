import { TRANSFER_GET } from "../api/EndPoint";

export default function GetTransferAPI() {
  return new Promise((resolve, reject) => {

    const url = TRANSFER_GET
    fetch(url, {
      method: "GET",
      headers: {"token":"698b15a2-e38f-3d7b-a611-d551420d721e"},
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
