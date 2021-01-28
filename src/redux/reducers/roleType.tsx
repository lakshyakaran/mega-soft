interface type {
  roleType: any;
}

const initialState: type = {
  roleType: "Employee",
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
    default:
      return {
        ...state,
      };
  }
}
