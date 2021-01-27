import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Admin from "./Views/Appraisal";
import AddAppraisal from "./Views/AddAppraisal";
import UpdateAppraisal from "./Views/UpdateAppraisal";
import AppraisalDetail from "./Views/AppraisalDetail";
import GoalSetting from "./Views/GoalSetting";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Admin} />
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
