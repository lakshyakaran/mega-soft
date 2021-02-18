interface type {
  roleType: any;
  menuItem: any;
}

const initialState: type = {
  roleType: window.sessionStorage.getItem("roleType") || "Employee",
  menuItem: window.sessionStorage.getItem("menuItem") || false,
};

export default function roleType(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "ROLE_TYPE": {
      return {
        ...state,
        roleType: action.payload,
      };
    }

    case "HANDLE_MENU": {
      return {
        ...state,
        menuItem: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
