interface appraisalType {
  employeeList: any;
  isLoading: boolean;
}

const initialState: appraisalType = {
  employeeList: [],
  isLoading: true,
};

export default function employeeList(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "FETCH_EMPOLYEE_LIST_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_EMPLOYEE_LIST_SUCCESS": {
      return {
        employeeList: action.payload,
        isLoading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
