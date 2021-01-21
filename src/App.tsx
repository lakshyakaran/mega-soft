import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Admin from "./views/Admin";
import Form from "./components/AddApprisalForm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Admin} />
          <Route exact path="/addApprisal" component={Form} />
          {/* <Route exact path="/appraisal/add" component={Form} />
          <Route exact path="/appraisal/update/:id" component={Form} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
