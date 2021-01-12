import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from './Navigation';
import Header from './Header';

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Navigation />
      </Header>
      <div style={{display:'flex'}}>
        <Switch>
          {/* <Route exact path="/" component={} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
