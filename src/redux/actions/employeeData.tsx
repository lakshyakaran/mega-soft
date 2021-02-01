import axios from "axios";

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
      },
    });
    // console.log("fetch employeee api response =>", response.data);
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

export const fetchEmployeeDataByID = async (
  doctype = "EmployeeAppraisal",
  limit_start = 0,
  limit = 10,
  role = "Employee",
  filters: any
) => {
  const response = await axios({
    url: `http://52.146.0.154/api/method/megasoft_hrms.pm.employee_appraisals`,
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
      Authorization: " token 5ccbc7af363c163:b6060f97664d556",
    },
  });
  // console.log("fetch employeee api response =>", response.data);
  const responseBody = await response.data.message;
  return responseBody;
};
