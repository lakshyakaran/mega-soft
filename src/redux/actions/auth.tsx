import axios from "axios";
import base64 from "base-64";

export const auth = (item: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: item,
  };
};

// export const Auth = async (
//   dispatch: (arg0: { type: string; payload: any }) => void
// ) => {
//   try {
//     const response = await axios({
//       //   url: `http://52.146.0.154/api/resource/Appraisal`,
//       //   url: `http://52.146.0.154/api/method/version`,
//       url: `http://52.146.0.154/api/method/login?usr=rahul.sinha@nuagebiz.tech&pwd=F@ntastic2020`,

//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         // "Access-Control-Allow-Origin": "localhost",
//         // "Access-Control-Allow-Headers":
//         //   "Origin,  Content-Type, Accept-Encoding, User-Agent",
//         // "Accept-Encoding": "application/json",
//         // "User-Agent":
//         //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
//         // Authorization: { authHeader },
//       },
//     });
//     const responseBody = await response.data;
//     console.log("auth api response==>", responseBody);
//     dispatch({
//       type: "LOGIN_SUCCESS",
//       payload: responseBody,
//     });
//   } catch (error) {
//     return {
//       ...error,
//     };
//   }
// };
