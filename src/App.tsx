import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
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
import ChanageColor from "./components/ChanageColor";
import { initSideBar } from "./SideNavigation/sideBar";
import { customSideBar } from "./SideNavigation/custom";

import $ from "jquery";

import { validateLogin, login } from "./redux/actions/auth";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import roleType from "./redux/reducers/roleType";

const getQueryParms = () => {
  const url = window.location.href;
  const str = url;
  const param = "access_token=";
  let res = str.split("&", 1);
  let n = res[0].search(param);

  if (n < 0) {
    return;
  }
  n += param.length;
  let access_token = res[0].substr(n);
  return access_token;
};

function App(props: any) {
  // console.log("props==>", props.Auth.isLoggedIn);
  // const getAccessToken = () => {
  //   const url = window.location.href;
  //   console.log("url ==", url);
  //   const str = url;
  //   const param = "access_token=";
  //   let res = str.split("&", 1);
  //   let n = res[0].search(param);

  //   if (n < 0) {
  //     return;
  //   }
  //   n += param.length;
  //   let access_token = res[0].substr(n);
  //   console.log("access_token on load==>", access_token);
  //   sessionStorage.setItem("access_token", access_token);
  // };
  // useEffect(() => {
  //   getAccessToken();
  // }, []);
  const hist = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.Auth);

  // const msRoute = () => {
  //   $("a.sidebar-link").on("click", function () {
  //     const route = String($(this).attr("href"));
  //     console.log("Menu Option selected ==>", route);
  //     alert(route);
  //     // React routing code:

  //     hist.push(route);

  //     return false;
  //   });
  // };

  useEffect(() => {
    initSideBar();
    customSideBar();

    dispatch(validateLogin());
  }, []);

  // sessionStorage.setItem("roleType", "Employee");
  // sessionStorage.setItem("menuType", "0");

  useEffect(() => {
    // const stateValue = getQueryParms("state");
    // const sessionStateValue = getQueryParms("session_state");
    const access_token = getQueryParms();
    // console.log("access_token main==>", access_token);
    // if (stateValue && sessionStateValue && access_token) {
    //   dispatch(login(sessionStateValue, stateValue, access_token));
    // }

    if (access_token) {
      dispatch(login(access_token));
    }
  }, []);

  if (auth.isLoading) {
    return null;
  }

  return (
    <Suspense fallback={null}>
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
                path="/appraisal/goalsetting/view/addjobhistory/:employeeId/:appraisalId"
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
              <Route exact path="/home/changecolor" component={ChanageColor} />
              <Route path="/*" render={() => <Redirect to="/home" />} />
              <Route
                path="/appraisal/goalsetting*"
                render={() => <Redirect to="/appraisal/goalsetting" />}
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
    </Suspense>
  );
}

export default App;
