import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";
import { handleRefreshToken } from "./auth";

const client_id = OAuthParameters.client_id;

export const fetchGoalData = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "order_no asc",
  filters: any
) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.resource}/AppraisalGoals`,
      params: {
        limit_start,
        limit_page_length,
        order_by,
        filters,
        fields: JSON.stringify([
          "name",
          "appraisal_id",
          "employee_id",
          "order_no",
          "goal_id",
          "goal_type",
          "kra",
          "goal",
          "weightage",
          "measure",
          "target",
          "threshold",
          "stretch",
          "parent_goal_id",
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
    //   console.log("fetch GOAL api response =>", response.data);
    const responseBody = await response.data;
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
            fetchGoalData(
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

export const fetchGoalDataName = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "order_no asc",
  filters: any
) => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const response = await axios({
      url: `${apiUrl.resource}/AppraisalGoals`,
      params: {
        limit_start,
        limit_page_length,
        order_by,
        filters,
        fields: JSON.stringify([
          "name",
          "appraisal_id",
          "employee_id",
          "order_no",
          "goal_id",
          "goal_type",
          "kra",
          "goal",
          "weightage",
          "measure",
          "target",
          "threshold",
          "stretch",
          "parent_goal_id",
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
    //   console.log("fetch GOAL api response =>", response.data);
    const responseBody = await response.data;
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
            fetchGoalDataName(
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

export const add_goals = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiUrl.resource}/AppraisalGoals`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(data),
  });
  console.log("add goal api response =>", response);
  const responseBody = response;
  return responseBody;
};

export const update_goals = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiUrl.resource}/AppraisalGoals/${data.name}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(data),
  });
  // console.log("update goal api response =>", response);
  const responseBody = response;
  return responseBody;
};
