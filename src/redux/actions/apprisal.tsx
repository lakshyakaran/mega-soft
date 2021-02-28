import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";
import { handleRefreshToken, logout } from "./auth";

const client_id = OAuthParameters.client_id;

export const fetchAppraisalData = (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "id asc",
  filters: any,
  role:any
) => async (dispatch: any): Promise<any> => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    return false;
  }
  const accessToken = "bearer " + token;
  try {
    dispatch({
      type: "FETCH_APPRAISAL_LIST_START",
    });
    const response = await axios({
      url: `${apiUrl.resource}/Appraisal`,
      params: {
        limit_start,
        limit_page_length,
        order_by,
        filters,
        role,
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
          "department"
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
    // console.log("Appraisal api response =>", responseBody);
    dispatch({
      type: "FETCH_APPRAISAL_LIST_SUCCESS",
      payload: responseBody,
    });
    return responseBody;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        console.log("inside 403 error block", JSON.stringify(error.response));
        const refresh_token = sessionStorage.getItem("refresh_token");
        const data = {
          refresh_token: refresh_token,
          client_id: client_id,
        };
        handleRefreshToken(data)
          .then((response: any) => {
            console.log("response of refresh token ", response);
            console.log("calling handle appraisal again.");
            console.log("indise response of if condtion==>")
              fetchAppraisalData(
                limit_start,
                limit_page_length,
                order_by,
                filters,
                role
              );
          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );
            dispatch({
              type: "LOGOUT_SUCCESS",
            });
          });
      }
    }
    return {
      ...error,
    };
  }
};

export const fetchAppraisalDataById = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "id asc",
  filters: any,
  role:any
) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.resource}/Appraisal`,
      params: {
        limit_start,
        limit_page_length,
        order_by,
        filters,
        role,
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
          "department"
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
    // console.log("api data by id", responseBody)
    return responseBody;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        console.log("inside 403 error block", JSON.stringify(error.response));
        const refresh_token = sessionStorage.getItem("refresh_token");
        const data = {
          refresh_token: refresh_token,
          client_id: client_id,
        };
        handleRefreshToken(data)
          .then((response: any) => {
            console.log("response of refresh token ", response);
            console.log("calling handle appraisal again.");
            fetchAppraisalDataById(
                limit_start,
                limit_page_length,
                order_by,
                filters,
                role
              );
            
          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );
            // dispatch(logout());
          });
      }
    }
    return {
      ...error,
    };
  }
};

export const add_apprisal = async (data: any, role:any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const items = {
    data: data,
    role
  }
  console.log("itmes to add==>", items)
  const response = await axios({
    url: `${apiUrl.resource}/Appraisal`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(items)
  });
  return response;
};
export const edit_appraisal = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiUrl.resource}/Appraisal/${data.id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(data),
  });
  // console.log("api response ==>", response)
  return response;
};

export const filterByEmployee = async (order_by = "employee_name asc") => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.resource}/Employee`,
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
