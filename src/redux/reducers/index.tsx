import { combineReducers } from "redux";
import tasks from "./tasks";
import appraisal from "./apprisal";
import userData from "./userData";
import employeeList from "./employeeList";

const reducer = combineReducers({
  tasks,
  appraisal,
  userData,
  employeeList,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
