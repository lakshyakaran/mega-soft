interface employeeType {
  employeeList: any;
  isLoading: boolean;
  count: number;
  total_count: number;
}

const initialState: employeeType = {
  employeeList: [],
  isLoading: true,
  count: 0,
  total_count: 0,
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
        ...state,
        employeeList: action.payload.data,
        total_count: action.payload.total_count,
        count: action.payload.count,
        isLoading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
