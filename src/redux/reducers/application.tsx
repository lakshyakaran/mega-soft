const initialState = {
  language: window.sessionStorage.getItem("language") || "en",
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
    default:
      return state;
  }
}
