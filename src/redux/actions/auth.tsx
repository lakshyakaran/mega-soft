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
  // console.log("access_token ==>", access_token);
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

// export const logout = () => async (dispatch: any): Promise<any> => {
//   const token = sessionStorage.getItem("access_token");
//   const accessToken = "bearer " + token;
//   if (token === null) {
//     dispatch({
//       type: "LOGOUT_SUCCESS",
//     });
//     return false;
//   }
//   const response = await axios({
//     url: `http://52.146.0.154/api/method/frappe.integrations.oauth2.revoke_token`,
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       Authorization: accessToken,
//     },
//   });
//   const responseBody = await response.data;
//   sessionStorage.removeItem("access_token");
//   dispatch({
//     type: "LOGOUT_SUCCESS",
//   });
//   return false;

// };

export const logout = () => async (dispatch: any): Promise<any> => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const formData = new FormData();
    formData.append("token", token);
    const response = await axios({
      url: `http://52.146.0.154/api/method/frappe.integrations.oauth2.revoke_token`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
      },
      data: formData,
    });
    sessionStorage.removeItem("access_token");
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    return response;
  } catch (error) {
    console.log("error in catch block=>", JSON.stringify(error));
    return {
      ...error,
    };
  }
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
