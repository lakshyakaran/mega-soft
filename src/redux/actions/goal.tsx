import axios from "axios";

export const fetchGoalData = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "order_no asc",
  filters: any
) => {
  const response = await axios({
    url: ` http://52.146.0.154/api/resource/AppraisalGoals`,
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
      Authorization: " token 5ccbc7af363c163:b6060f97664d556",
    },
  });
  //   console.log("fetch GOAL api response =>", response.data);
  const responseBody = await response.data;
  return responseBody;
};

export const fetchGoalDataName = async (
  limit_start = 0,
  limit_page_length = 10,
  order_by = "order_no asc",
  filters: any
) => {
  const response = await axios({
    url: ` http://52.146.0.154/api/resource/AppraisalGoals`,
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
      Authorization: " token 5ccbc7af363c163:b6060f97664d556",
    },
  });
  //   console.log("fetch GOAL api response =>", response.data);
  const responseBody = await response.data;
  return responseBody;
};

export const add_goals = async (data: any) => {
  const response = await axios({
    url: ` http://52.146.0.154/api/resource/AppraisalGoals`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "token 5ccbc7af363c163:b6060f97664d556",
    },
    data: JSON.stringify(data),
  });
  console.log("add goal api response =>", response);
  const responseBody = await response;
  return responseBody;
};

export const update_goals = async (data: any) => {
  const response = await axios({
    url: ` http://52.146.0.154/api/resource/AppraisalGoals/${data.name}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "token 5ccbc7af363c163:b6060f97664d556",
    },
    data: JSON.stringify(data),
  });
  console.log("update goal api response =>", response);
  const responseBody = await response;
  return responseBody;
};
