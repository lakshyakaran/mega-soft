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

import { validateLogin, login } from "./redux/actions/auth";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";

const getQueryParms = (variable: string) => {
        var query = window.location.search.substring(1);
        console.log(query)//"app=article&act=news_content&aid=160990"
        var vars = query.split("&");
        console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    console.log(pair)//[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ] 
        if(pair[0] == variable){return pair[1];}
         }
         return(false);
}

function App(props: any) {
  // console.log("props==>", props.Auth.isLoggedIn);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.Auth);

  useEffect(() => {
    dispatch(validateLogin());
  }, []);

  useEffect(() => {
    const stateValue = getQueryParms("state")
    const sessionStateValue = getQueryParms("session_state")
    if(stateValue && sessionStateValue) {
      dispatch(login(sessionStateValue, stateValue))
    }
  }, [])

  if (auth.isLoading) {
    return null;
  }

  return (
    <BrowserRouter>
      {auth.isLoggedIn == true ? (
      <Switch>
        <div className="page-wrapper">
          <Navigation />
          {/* <Route exact path="/" component={Login} /> */}
          <Route exact path="/home" component={Appraisal} />
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
          <Route path="/*" render={() => <Redirect to="/home" />} />
          <Route path="/appraisal/goalsetting*" render={() => <Redirect to="/appraisal/goalsetting" />} />
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
