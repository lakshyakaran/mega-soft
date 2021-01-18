import axios from "axios";
import base64 from "base-64";

export const processAddList = (item: any) => {
  return {
    type: "ADD_LIST",
    payload: item,
  };
};

export const processRemoveList = (item: any) => {
  return {
    type: "REMOVE_LIST",
    payload: item,
  };
};

export const processUpdateList = (item: any) => {
  return {
    type: "UPDATE_LIST",
    payload: item,
  };
};

export const fetchUserList = (item: any) => {
  return {
    type: "USER_LIST",
    payload: item,
  };
};

export const userData = async (
  callback: (arg0: { type: string; payload: any }) => void
) => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal?fields=["name","id","description","review_from","appraisal_to","review_frequency"]`,
      //   url: `http://52.146.0.154/api/method/version`,
      //   url: `http://52.146.0.154/api/method/login?usr=rahul.sinha@nuagebiz.tech&pwd=F@ntastic2020`,

      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "token ca9378d049d1ab4:a0d4d82db2d186a",
        // "Access-Control-Allow-Origin": "localhost",
        // "Access-Control-Allow-Headers":
        //   "Origin,  Content-Type, Accept-Encoding, User-Agent",
        // "Accept-Encoding": "application/json",
        // "User-Agent":
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
      },
    });
    const responseBody = await response.data;
    // console.log("api response==>", responseBody);
    // dispatch({
    //   type: "USER_LIST",
    //   payload: responseBody,
    // });
    if (typeof callback === "function") {
      callback(responseBody.data);
    }
  } catch (error) {
    return {
      ...error,
    };
  }
};
