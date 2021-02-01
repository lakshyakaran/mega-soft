import axios from "axios";

export const fetchJobHistory = async (role = "Employee", filters: any) => {
  const response = await axios({
    url: ` http://52.146.0.154/api/resource/JobHistory`,
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
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: " token 5ccbc7af363c163:b6060f97664d556",
    },
  });
  // console.log("fetch jobhisty api response =>", response.data);
  const responseBody = await response.data;
  return responseBody;
};

export const add_JobHistory = async (data: any) => {
  const response = await axios({
    url: ` http://52.146.0.154/api/resource/JobHistory`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "token 5ccbc7af363c163:b6060f97664d556",
    },
    data: JSON.stringify(data),
  });
  // console.log("fetch jobhisty api response =>", response.data);
  const responseBody = await response.data;
  return responseBody;
};
