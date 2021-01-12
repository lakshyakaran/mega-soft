export const processAddList = (item: any) => {
	return {
		type: 'ADD_LIST',
		payload : item
	}
}

export const processRemoveList = (item: any) => {
	return {
		type: 'REMOVE_LIST',
		payload : item
	}
}

export const processUpdateList = (item: any) => {
	return {
		type: 'UPDATE_LIST',
		payload : item
	}
}