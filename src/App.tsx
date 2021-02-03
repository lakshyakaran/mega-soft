import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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
import Login from "./Views/Login";

import { validateLogin } from "./redux/actions/auth";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

function App(props: any) {
  // console.log("props==>", props.Auth.isLoggedIn);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.Auth);
  
  useEffect(() => {
    dispatch(validateLogin());
  }, [])

  if(auth.isLoading) {
    return null
  }

  return (
    <BrowserRouter>
      {auth.isLoggedIn == true ? (
        <Switch>
          <div className="container">
            <Navigation />
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
            <Route
              exact
              path="/appraisal/goalsetting"
              component={GoalSetting}
            />
            <Route
              exact
              path="/appraisal/goalsetting/view/:employeeId/:appraisalId"
              component={EmployeeDetails}
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
              path="/appraisal/goalsetting/view/jobhistory/:employeeId/:appraisalId"
              component={JobHistory}
            />

            <Route
              exact
              path="/appraisal/goalsetting/view/addgoal/:employeeId/:appraisalId"
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
          </div>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
