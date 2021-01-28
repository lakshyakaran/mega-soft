const initialState = {
  UserData: [
    {
      name: "Ayush Kansal",
      id: "10075",
    },
  ],
};

export default function userData(
  state: { UserData: any[] } = initialState,
  action: { type: string; payload: any }
): { UserData: any[] } {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        UserData: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
