import { combineReducers } from "redux";
import tasks from "./tasks";
import appraisal from "./apprisal";
import userData from "./userData";
import employeeList from "./employeeList";
import navigationData from "./navigationData";
import roleType from "./roleType";
import jobHistory from "./jobHistory";

const reducer = combineReducers({
  tasks,
  appraisal,
  userData,
  employeeList,
  navigationData,
  roleType,
  jobHistory,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
