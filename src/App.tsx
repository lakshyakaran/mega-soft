import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import Navigation from './Navigation';
import Header from './Header';

import './App.css'

function App() {
  const _onBreadcrumbItemClicked = () => {

  }
  const itemsWithHeading: IBreadcrumbItem[] = [
    { text: 'Folder 1', key: 'd1', onClick: _onBreadcrumbItemClicked },
    { text: 'Folder 2', key: 'd2', isCurrentItem: true, as: 'h4' },
  ];
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Header item={itemsWithHeading} />
        <Switch>
          {/* <Route exact path="/" component={} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
