import axios from "axios";
import apiBase from '../../../src/apiBase.json';

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

export const fetchAppraisalData = (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "id asc",
  filters: any
) => async (dispatch: any): Promise<any> => {
  try {
    dispatch({
      type: "FETCH_APPRAISAL_LIST_START"
    });
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal`,
      params: {
        limit_start,
        limit_page_length,
        order_by,
        filters,
        fields: JSON.stringify([
          "name",
          "id",
          "appraisal_description",
          "review_from",
          "appraisal_to",
          "review_frequency",
          "type",
          "format_type",
          "format_type",
          "appraisal_owner",
          "kra_settings_tab_goals",
          "kra_settings_tab_competencies",
          "kra_settings_tab_development_plan",
          "kra_settings_tab_summary",
          "assessment_tab_goals",
          "assessment_tab_competencies",
          "assessment_tab_development_plan",
          "assessment_tab_summary"
        ]),
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
    dispatch({
      type: "FETCH_APPRAISAL_LIST_SUCCESS",
      payload: responseBody.data,
    });
    return responseBody;
  } catch (error) {
    // console.log("error in getting data", error);
    return {
      ...error,
    };
  }
};
