import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./Components/Form/Form";
import { Home } from "./Components/Home/Home";
import { Error } from "./Components/Error/Error";
import { Help } from "./Components/Help/Help";
import { About } from "./Components/About/About";
import { CardDetail } from "./Components/CardDetail/CardDetail";
import { LandingPage } from "./Components/LandingPage/LandingPage";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/form" component={Form} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/detail/:id"
          component={({ match }) => <CardDetail match={match} />}
        />
        <Route exact path="*" component={Error} />
      </Switch>
    </div>
  );
}
