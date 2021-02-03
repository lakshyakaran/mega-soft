const initialState = {
  isLoggedIn: true,
};

export default function Auth(
  state: { isLoggedIn: any } = initialState,
  action: { type: string; payload: any }
): { isLoggedIn: any } {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
