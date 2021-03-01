import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";
import { handleRefreshToken, logout } from "./auth";

const client_id = OAuthParameters.client_id;

export const fetchEmployeeData = (
  doctype = "EmployeeAppraisal",
  limit_start = 0,
  limit = 10,
  role: any,
  filters: any
) => async (dispatch: any): Promise<any> => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    dispatch({
      type: "FETCH_EMPOLYEE_LIST_START",
    });
    const response = await axios({
      url: `${apiUrl.method}/megasoft_hrms.pm.employee_appraisals`,
      params: {
        doctype,
        limit_start,
        limit,
        role,
        filters,
        fields: JSON.stringify(["employee_id", "appraisal_id", "status"]),
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: accessToken,
      },
    });
    // console.log("fetch employeee api response =>", response.data.message);
    const responseBody = await response.data.message;
    dispatch({
      type: "FETCH_EMPLOYEE_LIST_SUCCESS",
      payload: responseBody,
    });
    return responseBody;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("inside 401 error block", JSON.stringify(error.response));
        const refresh_token = sessionStorage.getItem("refresh_token");
        const data = {
          refresh_token: refresh_token,
          client_id: client_id,
        };
        handleRefreshToken(data)
          .then((response: any) => {
            console.log("response of refresh token ", response);
            console.log("calling goalsetting again.");
            dispatch(fetchEmployeeData(doctype, limit_start, limit, role, filters));

          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );
            dispatch(logout());
          });
      }
    }
    return {
      ...error,
    };
  }
};

export const fetchEmployeeDataByID = async (
  doctype = "EmployeeAppraisal",
  limit_start = 0,
  limit = 10,
  role = "Employee",
  filters: any
) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.method}/megasoft_hrms.pm.employee_appraisals`,
      params: {
        doctype,
        limit_start,
        limit,
        role,
        filters,
        fields: JSON.stringify(["employee_id", "appraisal_id", "status"]),
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: accessToken,
      },
    });
    // console.log("fetch employeee api response =>", response.data);
    const responseBody = await response.data.message;
    return responseBody;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("inside 401 error block", JSON.stringify(error.response));
        const refresh_token = sessionStorage.getItem("refresh_token");
        const data = {
          refresh_token: refresh_token,
          client_id: client_id,
        };
        handleRefreshToken(data)
          .then((response: any) => {
            console.log("response of refresh token ", response);
            console.log("calling goalsetting by id again.");
            fetchEmployeeData(doctype, limit_start, limit, role, filters);

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
