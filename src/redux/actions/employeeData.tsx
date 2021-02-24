import axios from "axios";
import apiUrl from "../../config";

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
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    console.log("error in getting employee data =>", error);
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
};
