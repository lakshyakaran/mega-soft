import axios from "axios";
import apiUrl from "../../config";

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
      url: `${apiUrl.method}/megasoft_hrms.pm.pm_sidebar_menu_permissions`,

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
