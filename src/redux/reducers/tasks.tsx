var initailState = {
  list: [
    {
      id: "1.343",
      name: "01",
      action: "action1",
      description: "Lorem ipsum dolor sit amet,",
      review_from: "20-05-2020",
      appraisal_to: "20-05-2020",
      review_frequency: "20-05-2020",
    },
    {
      id: "2.456",
      name: "02",
      action: "action1",
      description: "Lorem ipsum dolor sit amet,",
      review_from: "20-05-2020",
      appraisal_to: "20-05-2020",
      review_frequency: "20-05-2020",
    },
    {
      id: "1.343",
      name: "03",
      action: "action1",
      description: "Lorem ipsum dolor sit amet,",
      review_from: "20-05-2020",
      appraisal_to: "20-05-2020",
      review_frequency: "20-05-2020",
    },
    {
      id: "1.343",
      name: "04",
      action: "action1",
      description: "Lorem ipsum dolor sit amet,",
      review_from: "20-05-2020",
      appraisal_to: "20-05-2020",
      review_frequency: "20-05-2020",
    },
    {
      id: "1.343",
      name: "05",
      action: "action1",
      description: "Lorem ipsum dolor sit amet,",
      review_from: "20-05-2020",
      appraisal_to: "20-05-2020",
      review_frequency: "20-05-2020",
    },
  ],
};

export default function tasks(
  state: { list: any[] } = initailState,
  action: { type: string; payload: any }
): { list: any[] } {
  switch (action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    }
    case "REMOVE_LIST": {
      return {
        list: state.list.filter((list) => list?.id !== action.payload.id),
      };
    }
    case "UPDATE_LIST": {
      return {
        list: state.list.map((list) =>
          list.id === action.payload.id ? { ...action.payload } : { ...list }
        ),
      };
    }
    default:
      return {
        ...state,
      };
  }
}
