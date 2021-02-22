import axios from "axios";
import { apiBase } from "../../config.json";

export const fetchDevelopmentPlan = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "serial_no asc",
  filters: any
) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiBase}/EmployeeDevelopmentPlan`,
    params: {
      limit_start,
      limit_page_length,
      order_by,
      filters,
      fields: JSON.stringify([
        "name",
        "appraisal_id",
        "employee_id",
        "serial_no",
        "development_plan",
        "reviewer_remarks",
        "frozen",
      ]),
    },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
  });
  //   console.log("fetch DEVELOPMENT api response =>", response.data);
  const responseBody = response.data;
  return responseBody;
};

export const handleDevelopmentDataChange = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `http://52.146.0.154/api/method/megasoft_hrms.pm.employee_development_plan`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(data),
  });
  // console.log("Development data changed =>", response);
  const responseBody = response.data;
  return responseBody;
};
