interface type {
  menuType: any;
}

const initialState: type = {
  menuType: window.sessionStorage.getItem("menuType") || 1,
};

export default function menuType(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ROLE_TYPE": {
      return {
        ...state,
        menuType: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
