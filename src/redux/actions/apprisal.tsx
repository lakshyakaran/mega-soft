import axios from "axios";

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
        Authorization: "token ca9378d049d1ab4:a0d4d82db2d186a",
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
        Authorization: "token ca9378d049d1ab4:a0d4d82db2d186a",
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