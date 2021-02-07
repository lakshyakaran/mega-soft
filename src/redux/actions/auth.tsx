import axios from "axios";

export const validateLogin = () => {
  const sessionState = sessionStorage.getItem('sessionState')
  const state = sessionStorage.getItem('state')
  const user = {}
  if(sessionState && state) {
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

export const login = (sessionState: any, state: any) => {
  sessionStorage.setItem('sessionState', sessionState)
  sessionStorage.setItem('state', state)
  return {
    type: "LOGIN_SUCCESS",
    payload: {},
  };
};

export const logout = () => {
  sessionStorage.removeItem('sessionState')
  return {
    type: "LOGOUT_SUCCESS",
  };
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
