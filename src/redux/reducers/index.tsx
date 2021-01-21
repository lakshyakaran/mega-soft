import { combineReducers } from "redux";
import tasks from "./tasks";
import Appraisal from "./apprisal";
import userData from "./userData";

const reducer = combineReducers({
  tasks,
  Appraisal,
  userData,
});

export default reducer;
