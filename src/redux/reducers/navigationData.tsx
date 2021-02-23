interface navigationType {
  navigationData: any;
  isLoading: boolean;
}

const initialState: navigationType = {
  navigationData: [],
  isLoading: true,
};

export default function navigationData(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "FETCH_NAV_DATA_START": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "FETCH_NAVIGATION_DATA": {
      return {
        navigationData: action.payload,
        isLoading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
