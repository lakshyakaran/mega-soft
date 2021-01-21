import { combineReducers } from "redux";
import tasks from "./tasks";
import appraisal from "./apprisal";
import userData from "./userData";

const reducer = combineReducers({
  tasks,
  appraisal,
  userData,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>
