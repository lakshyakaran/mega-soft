import axios from "axios";
import apiBase from "../../../src/apiBase.json";
import accessToken from "../../apiBase.json";

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
      type: "FETCH_APPRAISAL_LIST_START",
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
          "assessment_tab_summary",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: " token 5ccbc7af363c163:b6060f97664d556",
        // "Access-Control-Allow-Origin": "localhost",
        // "Access-Control-Allow-Headers":
        //   "Origin,  Content-Type, Accept-Encoding, User-Agent",
        // "Accept-Encoding": "application/json",
        // "User-Agent":
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
      },
    });
    const responseBody = await response.data;
    console.log("api response =>", responseBody);
    dispatch({
      type: "FETCH_APPRAISAL_LIST_SUCCESS",
      payload: responseBody,
    });
    return responseBody;
  } catch (error) {
    // console.log("error in getting data", error);
    return {
      ...error,
    };
  }
};

export const fetchEmployeeData = (
  doctype = "EmployeeAppraisal",
  limit_start = 0,
  limit = 10,
  role = "Employee"
) => async (dispatch: any): Promise<any> => {
  try {
    dispatch({
      type: "FETCH_EMPOLYEE_LIST_START",
    });
    const response = await axios({
      url: `http://52.146.0.154/api/method/megasoft_hrms.pm.employee_appraisals`,
      params: {
        doctype,
        limit_start,
        limit,
        role,
        fields: JSON.stringify(["employee_id", "appraisal_id", "status"]),
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: " token 5ccbc7af363c163:b6060f97664d556",
        // "Access-Control-Allow-Origin": "localhost",
        // "Access-Control-Allow-Headers":
        //   "Origin,  Content-Type, Accept-Encoding, User-Agent",
        // "Accept-Encoding": "application/json",
        // "User-Agent":
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
      },
    });
    console.log("fetch employeee api response =>", response.data);
    const responseBody = await response.data.message;
    dispatch({
      type: "FETCH_EMPLOYEE_LIST_SUCCESS",
      payload: responseBody,
    });
    return responseBody;
  } catch (error) {
    // console.log("error in getting data", error);
    return {
      ...error,
    };
  }
};
