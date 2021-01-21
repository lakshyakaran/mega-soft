interface appraisalType {
  [key: string]: any[];
} 

const initialState: appraisalType = {
  appraisalList: []
}

export default function appraisal(
  state = initialState,
  action: { type: string; payload: any[] }
){
  switch (action.type) {
    case "FETCH_APPRAISAL_LIST_SUCCESS": {
      return {
        appraisalList: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
