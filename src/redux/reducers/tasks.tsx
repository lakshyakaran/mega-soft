var initailState = {
	list : []
}


export default function tasks
    (state = initailState, action = {}) {
	switch(action.type){
		case "ADD_LIST" : {
			return {
				list : [...state.list, action.payload]
			}
		}
		case "REMOVE_LIST" : {
			return {
				list : state.list.filter(list => list.id !== action.payload.id)
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