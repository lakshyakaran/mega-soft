  
import { combineReducers } from 'redux'
import tasks from './tasks'
import Appraisal from './apprisal'

const reducer = combineReducers({
	tasks,
	Appraisal
})

export default reducer