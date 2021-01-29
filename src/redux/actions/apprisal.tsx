import axios from "axios";
import accessToken from "../../apiBase.json";

export const addApprisal = (item: any) => {
  return {
    type: "ADD_APPRISAL",
    payload: item,
  };
};

export const add_apprisal = async (data: any) => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "token 5ccbc7af363c163:b6060f97664d556",
      },
      data: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.log("error in catch block=>", JSON.stringify(error));
    return {
      ...error,
    };
  }
};

export const edit_appraisal = async (data: any) => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal/${data.id}`,
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: " token 5ccbc7af363c163:b6060f97664d556",
      },
      data: JSON.stringify(data),
    });
    // console.log("api response ==>", response)
    return await response;
  } catch (error) {
    return {
      ...error,
    };
  }
};

export const delete_appraisal = async (data: any) => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal/${data.id}`,
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: " token 5ccbc7af363c163:b6060f97664d556",
      },
      data: JSON.stringify(data),
    });
    console.log("delete api response ==>", response);
    return await response;
  } catch (error) {
    return {
      ...error,
    };
  }
};
