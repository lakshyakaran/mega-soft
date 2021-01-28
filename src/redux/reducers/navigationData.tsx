interface navigationType {
  navigationData: any;
}

const initialState: navigationType = {
  navigationData: [],
};

export default function navigationData(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "FETCH_NAVIGATION_DATA": {
      return {
        navigationData: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
