import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";
import { handleRefreshToken } from "./auth";

const client_id = OAuthParameters.client_id;


export const jobHistoryData = (
  role = "Employee",
  filters: any,
  limit_start = 0,
  limit_page_length = 10,
  order_by = "from_date asc"
) => async (dispatch: any): Promise<any> => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  try {
    dispatch({
      type: "FETCH_JOB_HISTORY_START",
    });
    const response = await axios({
      url: `${apiUrl.resource}/JobHistory`,
      params: {
        role,
        filters,
        limit_start,
        limit_page_length,
        order_by,
        fields: JSON.stringify([
          "employee_id",
          "appraisal_id",
          "position_held",
          "from_date",
          "to_date",
          "from_date",
          "place_of_posting",
          "key_responsibilities",
          "qualifications",
          "name",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: accessToken,
      },
    });
    // console.log("fetch jobhisty api response =>", response.data);
    const responseBody = await response.data;
    dispatch({
      type: "FETCH_JOB_HISTORY_SUCCESS",
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
            jobHistoryData(
              role,
              filters,
              limit_start,
              limit_page_length,
              order_by,
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

export const fetchJobHistory = async (
  role = "Employee",
  filters: any,
  limit_start = 0,
  limit_page_length = 10,
  order_by = "from_date asc"
) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  try {
    const response = await axios({
      url: `${apiUrl.resource}/JobHistory`,
      params: {
        role,
        filters,
        limit_start,
        limit_page_length,
        order_by,
        fields: JSON.stringify([
          "employee_id",
          "appraisal_id",
          "position_held",
          "from_date",
          "to_date",
          "from_date",
          "place_of_posting",
          "key_responsibilities",
          "qualifications",
          "name",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: accessToken,
      },
    });
    // console.log("fetch jobhisty api response =>", response.data);
    const responseBody = await response.data;
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
            fetchJobHistory(
              role,
              filters,
              limit_start,
              limit_page_length,
              order_by,
            );
          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );
            // dispatch({
            //   type: "LOGOUT_SUCCESS",
            // });
          });
      }
    }
    return {
      ...error,
    };
  }
};

export const fetchJobHistoryByName = async (
  role = "Employee",
  filters: any
) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  try {
    const response = await axios({
      url: `${apiUrl.resource}/JobHistory`,
      params: {
        role,
        filters,
        fields: JSON.stringify([
          "employee_id",
          "appraisal_id",
          "position_held",
          "from_date",
          "to_date",
          "from_date",
          "place_of_posting",
          "key_responsibilities",
          "qualifications",
          "name",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessToken,
      },
    });
    // console.log("fetch jobhisty api response =>", response.data);
    const responseBody = await response.data;
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
            fetchJobHistory(
              role,
              filters,
            );
          })
          .catch((error) => {
            console.log(
              "ERROR: 2. unable to refresh access_token logging out.",
              error.response
            );
            // dispatch({
            //   type: "LOGOUT_SUCCESS",
            // });
          });
      }
    }
    return {
      ...error,
    };
  }
};

export const add_JobHistory = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiUrl.resource}/JobHistory`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(data),
  });
  console.log("add jobhisty api response =>", response);
  const responseBody = await response;
  return responseBody;
};

export const update_JobHistory = async (data: any) => {
  const token = sessionStorage.getItem("access_token");
  if (token === null) {
    return false;
  }
  const accessToken = "bearer " + token;
  const response = await axios({
    url: `${apiUrl.resource}/JobHistory/${data.name}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: accessToken,
    },
    data: JSON.stringify(data),
  });
  // console.log("update jobhisty api response =>", response);
  const responseBody = response;
  return responseBody;
};
