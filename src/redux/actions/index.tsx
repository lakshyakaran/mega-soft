import axios from "axios";
import base64 from "base-64";
import { useDispatch } from "react-redux";

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

export const userData = async (limit_start = 0, limit_page_length = 10, order_by = "id asc") => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal`,
      params: {
        limit_start,
        limit_page_length,
        order_by,
        fields: JSON.stringify(["name","id","description","review_from","appraisal_to","review_frequency"])
      },
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
    return responseBody
    // dispatch({
    //   type: "USER_LIST",
    //   payload: responseBody,
    // });
  } catch (error) {
    return {
      ...error,
    };
  }
};
