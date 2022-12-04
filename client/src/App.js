import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Switch>
      {
        <Route exact path="/home" component={Cards} />
        /* <Route exact path=""component={LandingPage} />
      <Route exact path="" component={} />
      <Route exact path="" component={} />
      <Route exact path="" component={} />
      <Route  path="*" component={NotFound} /> */
      }
    </Switch>
  );
}
