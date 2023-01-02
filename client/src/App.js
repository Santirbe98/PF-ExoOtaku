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
import { CheckOutSuccess } from "./Components/CheckOutSuccess/CheckOutSuccess";
import { CartProvider } from "./Components/Cart/CartContext";
import CartBanner from "./Components/Cart/CartDetail";
import Orders from "./Components/Orders/Orders";

import { Acount } from "./Components/Acount/Acount";

export default function App() {
  return (
    <div className="App">
      <CartProvider>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/cartDetail" component={CartBanner} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/about" component={About} />

          <Route exact path="/acount" component={Acount} />

          <Route extac path="/checkout-success" component={CheckOutSuccess} />
          <Route
            exact
            path="/detail/:id"
            component={({ match }) => <CardDetail match={match} />}
          />
          <Route exact path="/settings" component={Orders} />
          <Route exact path="*" component={Error} />
        </Switch>
      </CartProvider>
    </div>
  );
}
