import axios from "axios";
import accessToken from "../../apiBase.json";

export const addApprisal = (item: any) => {
  return {
    type: "ADD_APPRISAL",
    payload: item,
  };
};

export const deleteAppraisalByID = (item: any) => {
  return {
    type: "DELETE_APPRAISAL",
    payload: item,
  };
};

export const fetchAppraisalData = (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "id asc",
  filters: any
) => async (dispatch: any): Promise<any> => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
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
          "is_deleted",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });
    const responseBody = response.data;
    console.log("Appraisal api response =>", responseBody);
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

export const fetchAppraisalDataById = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "id asc",
  filters: any
) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
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
          "is_deleted",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });
    const responseBody = await response.data;
    // console.log("api data by id", responseBody)
    return responseBody;
  } catch (error) {
    // console.log("error in getting data", error);
    return {
      ...error,
    };
  }
};

export const add_apprisal = async (data: any) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
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
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Appraisal/${data.id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
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
      url: `http://52.146.0.154/api/resource/Appraisal/${data}`,
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
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

export const filterByEmployee = async (order_by = "employee_name asc") => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `http://52.146.0.154/api/resource/Employee`,
      params: {
        order_by,
        fields: JSON.stringify(["employee_id", "employee_name"]),
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });
    // console.log("Api filter by employee==>", response);
    const responseBody = response.data;
    return responseBody;
  } catch (error) {
    // console.log("error in getting data", error);
    return {
      ...error,
    };
  }
};
