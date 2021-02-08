import axios from "axios";

export const fetchNavigationBar = (
  doctype = "EmployeeAppraisal",
  role = "Employee"
) => async (dispatch: any): Promise<any> => {
  try {
    const response = await axios({
      url: `http://52.146.0.154/api/method/megasoft_hrms.pm.pm_menu`,
      params: {
        doctype,
        role,
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: " token 5ccbc7af363c163:b6060f97664d556",
      },
    });
    const responseBody = await response.data.message;
    // console.log("api response navigation bar =>", responseBody);
    dispatch({
      type: "FETCH_NAVIGATION_DATA",
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

export const sideNavigationData = async (home_menu = 0) => {
  const response = await axios({
    url: `http://52.146.0.154/api/method/megasoft_hrms.pm.pm_collapsible_menu`,
    params: {
      home_menu,
    },
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: " token 5ccbc7af363c163:b6060f97664d556",
    },
  });
  // console.log("side nav api response =>", response.data);
  const responseBody = await response.data;
  return responseBody;
};
