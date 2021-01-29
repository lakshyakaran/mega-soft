import axios from "axios";

export const fetchJobHistory = (role = "Employee") => async (
  dispatch: any
): Promise<any> => {
  try {
    dispatch({
      type: "FETCH_JOB_HISTORY_START",
    });
    const response = await axios({
      url: ` http://52.146.0.154/api/resource/JobHistory`,
      params: {
        role,
        // filters,
        fields: JSON.stringify([
          "employee_id",
          "appraisal_id",
          "position_held",
          "from_date",
          "to_date",
          "place_of_posting",
        ]),
      },
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "multipart/form-data",
        Authorization: " token 5ccbc7af363c163:b6060f97664d556",
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
    // console.log("error in getting data", error);
    return {
      ...error,
    };
  }
};
