interface jobType {
  jobHistory: any;
  isLoading: boolean;
  count: number;
  total_count: number;
}

const initialState: jobType = {
  jobHistory: [],
  isLoading: true,
  count: 0,
  total_count: 0,
};

export default function jobHistory(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "FETCH_JOB_HISTORY_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_JOB_HISTORY_SUCCESS": {
      return {
        ...state,
        jobHistory: action.payload.data,
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
