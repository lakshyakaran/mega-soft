import axios from "axios";
import apiUrl, { OAuthParameters } from "../../config";
import { handleRefreshToken, logout } from "./auth";

const client_id = OAuthParameters.client_id;

export const sideNavigationData = (items: any) => async (
  dispatch: any
): Promise<any> => {
  try {
    const token = sessionStorage.getItem("access_token");
    if (token === null) {
      return false;
    }
    const accessToken = "bearer " + token;
    const formData = new FormData();
    formData.append("home_menu", items);
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
    // if (error.response) {
    //   if (error.response.status === 401) {
    //     console.log("inside 401 error block", JSON.stringify(error.response));
    //     const refresh_token = sessionStorage.getItem("refresh_token");
    //     const data = {
    //       refresh_token: refresh_token,
    //       client_id: client_id,
    //     };
    //     handleRefreshToken(data)
    //       .then((response: any) => {
    //         console.log("response of refresh token ", response);
    //         console.log("calling menu again.");
    //         sideNavigationData(items);

    //       })
    //       .catch((error) => {
    //         console.log(
    //           "ERROR: 2. unable to refresh access_token logging out.",
    //           error.response
    //         );
    //         dispatch(logout());
    //       });
    //   }
    // }
    return {
      ...error,
    };
  }
};
