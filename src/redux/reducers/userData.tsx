const initialState = {
  UserData: [
    {
      name: "Ayush Kansal",
      id: "10075",
    },
  ],
  user: {},
};

export default function userData(
  state: { UserData: any[]; user: any } = initialState,
  action: { type: string; payload: any }
): { UserData: any[]; user: any } {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        UserData: action.payload,
      };
    }

    case "USER_INFO": {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
