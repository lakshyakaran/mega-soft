import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Admin from "./views/Admin";
import Form from "./components/AddApprisalForm";
import UpdateAppraisal from "./views/UpdateAppraisal";
import AppraisalDetail from "./views/AppraisalDetail";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route exact path="/addApprisal" component={Form} />
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
