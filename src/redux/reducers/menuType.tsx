interface type {
  menuType: any;
}

const initialState: type = {
  menuType: window.sessionStorage.getItem("menuType") || 0,
};

export default function menuType(
  state = initialState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case "MENU_TYPE": {
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
