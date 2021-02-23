const initialState = {
  isLoading: true,
  isLoggedIn: false,
};

export default function Auth(
  state: { isLoggedIn: any; isLoading: any } = initialState,
  action: { type: string; payload: any }
): { isLoggedIn: any; isLoading: any } {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
