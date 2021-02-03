import axios from "axios";

export const validateLogin = () => {
  const accessToken = sessionStorage.getItem('accessToken')
  const user = {}
  if(accessToken) {
    return {
      type: "LOGIN_SUCCESS",
      payload: user,
    };
  } else {
    return {
      type: "LOGOUT_SUCCESS",
    };
  }
}

export const auth = (accessToken: any, user: any) => {
  sessionStorage.setItem('accessToken', accessToken)
  return {
    type: "LOGIN_SUCCESS",
    payload: user,
  };
};

export const logout = () => {
  sessionStorage.removeItem('accessToken')
  return {
    type: "LOGOUT_SUCCESS",
  };
};

export const login = async () => {
  const response = await axios({
    url: `http://52.146.0.154/api/method/megasoft_hrms.pm.ms_hrms_login`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: " token 5ccbc7af363c163:b6060f97664d556",
    },
  });
  const responseBody = await response.data;
  return responseBody;
};
