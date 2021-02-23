import axios from "axios";

// export const fetchNavigationBar = (
//   doctype = "EmployeeAppraisal",
//   role = "Employee"
// ) => async (dispatch: any): Promise<any> => {
//   try {
//     const response = await axios({
//       url: `http://52.146.0.154/api/method/megasoft_hrms.pm.pm_menu`,
//       params: {
//         doctype,
//         role,
//       },
//       method: "GET",
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Accept: "multipart/form-data",
//         Authorization: " token 5ccbc7af363c163:b6060f97664d556",
//       },
//     });
//     const responseBody = await response.data.message;
//     // console.log("api response navigation bar =>", responseBody);
//     dispatch({
//       type: "FETCH_NAVIGATION_DATA",
//       payload: responseBody,
//     });
//     return responseBody;
//   } catch (error) {
//     // console.log("error in getting data", error);
//     return {
//       ...error,
//     };
//   }
// };

// export const sideNavigationData = async (home_menu: any) => {
//   const response = await axios({
//     url: `http://52.146.0.154/api/method/megasoft_hrms.pm.pm_collapsible_menu`,
//     params: {
//       home_menu,
//     },
//     method: "GET",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Accept: "multipart/form-data",
//       Authorization: "token 5ccbc7af363c163:b6060f97664d556",
//     },
//   });
//   // console.log("side nav api response =>", response.data);
//   const responseBody = await response.data;
//   return responseBody;
// };

// export const sideNavigationData = async () => {
//   const formData = new FormData();
//   formData.append("home_menu", "0");
//   const response = await axios({
//     url: `http://52.146.0.154/api/method/megasoft_hrms.pm.pm_sidebar_menu_permissions`,
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Accept: "multipart/form-data",
//       Authorization: "token 5ccbc7af363c163:b6060f97664d556",
//     },
//     data: formData,
//   });
//   // console.log("side nav api response =>", response.data);
//   const responseBody = response.data;
//   return responseBody;
// };

export const sideNavigationData = (data: any) => async (
  dispatch: any
): Promise<any> => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const formData = new FormData();
    formData.append("home_menu", data);
    dispatch({
      type: "FETCH_NAV_DATA_START",
    });
    const response = await axios({
      url: `http://52.146.0.154/api/method/megasoft_hrms.pm.pm_sidebar_menu_permissions`,

      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: accessToken,
      },
      data: formData,
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
