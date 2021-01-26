interface appraisalType {
  appraisalList: any[];
  isLoading: boolean
} 

const initialState: appraisalType = {
  appraisalList: [],
  isLoading: true,
}

export default function appraisal(
  state = initialState,
  action: { type: string; payload: any[] }
){
  switch (action.type) {
    case "FETCH_APPRAISAL_LIST_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_APPRAISAL_LIST_SUCCESS": {
      return {
        appraisalList: action.payload,
        isLoading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
