import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";
import { handleRefreshToken } from "./auth";

const client_id = OAuthParameters.client_id;

export const fetchDevelopmentPlan = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "serial_no asc",
  filters: any
) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.resource}/EmployeeDevelopmentPlan`,
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
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        const refresh_token = sessionStorage.getItem("refresh_token");
        const data = {
          refresh_token: refresh_token,
          client_id: client_id,
        };
        handleRefreshToken(data)
          .then((response: any) => {
            fetchDevelopmentPlan(
              limit_start,
              limit_page_length,
              order_by,
              filters,
            );
          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );

          });
      }
    }
    return {
      ...error,
    };
  }
};

export const handleDevelopmentDataChange = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiUrl.method}/megasoft_hrms.pm.employee_development_plan`,
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
