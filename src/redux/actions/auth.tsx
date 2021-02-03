import axios from "axios";

export const auth = (item: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: item,
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
