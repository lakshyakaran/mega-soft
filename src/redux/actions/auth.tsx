import axios from "axios";

// export const validateLogin = () => {
//   const sessionState = sessionStorage.getItem("sessionState");
//   const state = sessionStorage.getItem("state");
//   const access_token = sessionStorage.getItem("access_token");
//   const user = {};
//   if (sessionState && state) {
//     return {
//       type: "LOGIN_SUCCESS",
//       payload: user,
//     };
//   } else {
//     return {
//       type: "LOGOUT_SUCCESS",
//     };
//   }
// };

export const validateLogin = () => {
  const access_token = sessionStorage.getItem("access_token");
  console.log("access_token ==>", access_token);
  const user = {};
  if (access_token) {
    return {
      type: "LOGIN_SUCCESS",
      payload: user,
    };
  } else {
    return {
      type: "LOGOUT_SUCCESS",
    };
  }
};

// export const login = (sessionState: any, state: any, access_token: any) => {
//   sessionStorage.setItem("sessionState", sessionState);
//   sessionStorage.setItem("state", state);
//   sessionStorage.setItem("access_token", access_token);
//   return {
//     type: "LOGIN_SUCCESS",
//     payload: {},
//   };
// };

export const login = (access_token: any) => {
  // sessionStorage.setItem("sessionState", sessionState);
  // sessionStorage.setItem("state", state);
  sessionStorage.setItem("access_token", access_token);
  return {
    type: "LOGIN_SUCCESS",
    payload: {},
  };
};

export const logout = () => async (dispatch: any): Promise<any> => {
  const token = sessionStorage.getItem("access_token");
  console.log("Token=", token);
  const accessToken = "bearer " + token;
  if (token === null) {
    return false;
  }
  // const responseKeyCloak = await axios({
  //   url: `https://id.nuagebiz.tech/auth/realms/megasoft/protocol/openid-connect/logout?redirect_uri=http://localhost:3000/`,
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });
  // const responseKey = responseKeyCloak.data;
  // console.log("responseKey==>", responseKey);
  const response = await axios({
    url: `http://52.146.0.154/api/method/logout`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
  });
  const responseBody = await response.data;
  dispatch({
    type: "LOGOUT_SUCCESS",
    payload: responseBody,
  });
  console.log("logout api", response);
  return responseBody;

  // sessionStorage.removeItem("access_token");
  // return {
  //   type: "LOGOUT_SUCCESS",
  // };
};

// export const login = async () => {
//   const response = await axios({
//     url: `http://52.146.0.154/api/method/megasoft_hrms.pm.ms_hrms_login`,
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: " token 5ccbc7af363c163:b6060f97664d556",
//     },
//   });
//   const responseBody = await response.data;
//   return responseBody;
// };
