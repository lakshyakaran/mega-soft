var initailState = {
    Apprisal: [],
  };
  
  export default function Appraisal(
    state: { Apprisal: any[] } = initailState,
    action: { type: string; payload: any }
  ): { Apprisal: any[] } {
    switch (action.type) {
      case "ADD_APPRISAL": {
        return {
            ...state,
			...action.payload
        };
      }
      default:
        return {
          ...state,
        };
    }
  }
  