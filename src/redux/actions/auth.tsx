import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";

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

const client_id = OAuthParameters.client_id;

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

export const getAccessToken = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("grant_type", "authorization_code");
    formData.append("code", data.code);
    formData.append("redirect_uri", apiUrl.applicationHome);
    formData.append("client_id", data.client_id);
    formData.append("scope", data.scope);
    const response = await axios({
      url: `${apiUrl.method}/frappe.integrations.oauth2.get_token`,

      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: formData,
    });
    return response;
  } catch (error) {
    return {
      ...error,
    };
  }
};

export const handleRefreshToken = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("refresh_token", data.refresh_token);
    formData.append("grant_type", "refresh_token");
    formData.append("redirect_uri", apiUrl.applicationHome);
    formData.append("client_id", data.client_id);
    const response = await axios({
      url: `${apiUrl.method}/frappe.integrations.oauth2.get_token`,

      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      data: formData,
    });
    return response;
  } catch (error) {
    return {
      ...error,
    };
  }
};

export const login = (access_token: any, refresh_token: any) => {
  // sessionStorage.setItem("sessionState", sessionState);
  // sessionStorage.setItem("state", state);
  sessionStorage.setItem("access_token", access_token);
  sessionStorage.setItem("refresh_token", refresh_token);
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
    sessionStorage.removeItem("refresh_token");
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
    if (error.response) {
      if (error.response.status === 403) {
        console.log("inside 403 error block", JSON.stringify(error.response));
        const refresh_token = sessionStorage.getItem("refresh_token");
        const data = {
          refresh_token: refresh_token,
          client_id: client_id,
        };
        handleRefreshToken(data)
          .then((response: any) => {
            console.log("response of refresh token ", response);
            console.log("calling handle appraisal again.");
            if (!response.isAxiosError) {
              // fetchAppraisalData();
              return true;
            } else {
              console.log(
                "ERROR: 1. unable to refresh access_token logging out.",
                response
              );
              dispatch(logout());
            }
          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );
            dispatch(logout());
          });
      }
    }
    return {
      ...error,
    };
  }
};
