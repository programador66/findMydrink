import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/home";
import DrinksDetail from "../pages/drinksDetail";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/detail-drinks/:id" component={DrinksDetail} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
