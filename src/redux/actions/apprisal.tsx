import axios from "axios";
import { useDispatch } from "react-redux";

export const addApprisal = (item: any) => {
  return {
    type: "ADD_APPRISAL",
    payload: item,
  };
};

// const dispatch = useDispatch();

export const add_apprisal = async (credentials: any, callback: any) => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "token ca9378d049d1ab4:a0d4d82db2d186a",
      },
      data: JSON.stringify(credentials),
    });
    const responseBody = await response.data;
    console.log("api=>", responseBody);
    if (callback) {
      callback(responseBody.data);
    }
  } catch (error) {
    return {
      ...error,
    };
  }
};
