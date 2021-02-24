import axios from "axios";
import apiUrl from "../../config";

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

export const logout = () => async (dispatch: any): Promise<any> => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const formData = new FormData();
    formData.append("token", token);
    const response = await axios({
      url: `${apiUrl.method}/frappe.integrations.oauth2.revoke_token`,
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

export const userInfo = () => async (dispatch: any): Promise<any> => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.method}/megasoft_hrms.pm.logged_in_user`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: accessToken,
      },
    });
    const responseBody = await response.data.message;
    // console.log("responseBody user", responseBody);
    dispatch({
      type: "USER_INFO",
      payload: responseBody,
    });
    return responseBody;
  } catch (error) {
    console.log("error in getting userInfo =>", error);
    return {
      ...error,
    };
  }
};
