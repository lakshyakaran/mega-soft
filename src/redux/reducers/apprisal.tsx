interface appraisalType {
  appraisalList: any;
  count: number;
  total_count: number;
  isLoading: boolean;
}

const initialState: appraisalType = {
  appraisalList: [],
  count: 0,
  total_count: 0,
  isLoading: true,
};

export default function appraisal(
  state = initialState,
  action: { type: string; payload: any }
) {
  // console.log("action.payload=>", action.payload)
  switch (action.type) {
    case "FETCH_APPRAISAL_LIST_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_APPRAISAL_LIST_SUCCESS": {
      return {
        ...state,
        appraisalList: action.payload.data,
        total_count: action.payload.total_count,
        count: action.payload.count,
        isLoading: false,
      };
    }

    // case "DELETE_APPRAISAL": {
    //   return {
    //     appraisalList: action.payload.data.filter(
    //       (list: any) => list.id !== action.payload.id
    //     ),
    //   };
    // }
    default:
      return {
        ...state,
      };
  }
}
