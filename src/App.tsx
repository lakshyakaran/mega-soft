import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Appraisal from "./Views/Appraisal";
import AddAppraisal from "./Views/AddAppraisal";
import UpdateAppraisal from "./Views/UpdateAppraisal";
import AppraisalDetail from "./Views/AppraisalDetail";
import GoalSetting from "./Views/GoalSetting";
import EmployeeDetails from "./Views/EmployeeDetails";
import JobHistory from "./Views/JobHistory";
import UpdateJobHistory from "./Views/UpdateJobHistory";
import JobHistoryDetails from "./Views/JobHistoryDetails";
import AddGoals from "./Views/AddGoals";
import UpdateGoals from "./Views/UpdateGoals";
import GoalDetails from "./Views/GoalDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Appraisal} />
          <Route exact path="/addApprisal" component={AddAppraisal} />
          {/* <Route exact path="/appraisal/add" component={Form} /> */}
          <Route
            exact
            path="/appraisal/update/:appraisalId"
            component={UpdateAppraisal}
          />
          <Route
            exact
            path="/appraisal/view/:appraisalId"
            component={AppraisalDetail}
          />
          <Route exact path="/appraisal/goalsetting" component={GoalSetting} />
          <Route
            exact
            path="/appraisal/goalsetting/view/:employeeId"
            component={EmployeeDetails}
          />
          <Route
            exact
            path="/appraisal/goalsetting/view/jobhistory/:employeeId"
            component={JobHistory}
          />
          <Route
            exact
            path="/appraisal/goalsetting/view/jobhistory/updateJobHistory/:name"
            component={UpdateJobHistory}
          />

          <Route
            exact
            path="/appraisal/goalsetting/view/jobhistory/jobHistoryDetail/:name"
            component={JobHistoryDetails}
          />
          <Route
            exact
            path="/appraisal/goalsetting/view/addgoal/:employeeId"
            component={AddGoals}
          />
          <Route
            exact
            path="/appraisal/goalsetting/view/goals/updategoal/:name"
            component={UpdateGoals}
          />
          <Route
            exact
            path="/appraisal/goalsetting/view/goal/goaldetail/:name"
            component={GoalDetails}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
