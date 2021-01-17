var initailState = {
  list: [
    {
      sno: "01",
      action: "action1",
      id: "1.343",
      description: "Lorem ipsum dolor sit amet,",
      reviewFrom: "20-05-2020",
      appraisalTo: "20-05-2020",
      owner: "20-05-2020",
      reviewFrequency: "20-05-2020",
    },
    {
      sno: "02",
      action: "bltpro2",
      id: "1.343",
      description: "Lorem ipsum dolor sit amet,",
      reviewFrom: "20-05-2020",
      appraisalTo: "20-05-2020",
      owner: "20-05-2020",
      reviewFrequency: "20-05-2020",
    },
    {
      sno: "03",
      action: "dgfkogtw",
      id: "1.343",
      description: "Lorem ipsum dolor sit amet,",
      reviewFrom: "20-05-2020",
      appraisalTo: "20-05-2020",
      owner: "20-05-2020",
      reviewFrequency: "20-05-2020",
    },
    {
      sno: "04",
      action: "Lorem ipsum ",
      id: "1.343",
      description: "Lorem ipsum dolor sit amet,",
      reviewFrom: "20-05-2020",
      appraisalTo: "20-05-2020",
      owner: "20-05-2020",
      reviewFrequency: "20-05-2020",
    },
    {
      sno: "05",
      action: "monLorem ipsum ",
      id: "1.343",
      description: "Lorem ipsum dolor sit amet,",
      reviewFrom: "20-05-2020",
      appraisalTo: "20-05-2020",
      owner: "20-05-2020",
      reviewFrequency: "20-05-2020",
    },
  ],
};


export default function tasks(state: { list: any[] } = initailState , action: {type: string, payload: any}): { list: any[] }{
	switch(action.type){
		case "ADD_LIST" : {
			return {
				...state,
				list : [...state.list, action.payload]
			}
		}
		case "REMOVE_LIST" : {
			return {
				list : state.list.filter(list => list?.id !== action.payload.id)
			}
		} 
		case "UPDATE_LIST" : {
			return {
				list: state.list.map(list => list.id === action.payload.id ? {...action.payload} : {...list})
			}
		}
		default :
			return {
				...state
			}
	}
}