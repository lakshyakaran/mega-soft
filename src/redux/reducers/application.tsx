const initialState = {
  language: window.sessionStorage.getItem("language") || "US",
  primaryColor: window.sessionStorage.getItem("primaryColor") || "#00597d",
};

export default function application(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "CHANGE_PRIMARY_COLOR":
      return {
        ...state,
        primaryColor: action.payload,
      };
    default:
      return state;
  }
}
