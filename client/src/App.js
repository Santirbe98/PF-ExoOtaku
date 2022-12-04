import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./Components/Form/Form";
import { Home } from "./Components/Home/Home";
import { Error } from "./Components/Error/Error";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/form" component={Form} />
        <Route exact path="*" component={Error} />
      </Switch>
    </div>
  );
}
