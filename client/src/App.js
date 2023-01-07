import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { Form } from "./Components/Form/Form";
import { Shop } from "./Components/Shop/Shop";
import { Error } from "./Components/Error/Error";
import { Help } from "./Components/Help/Help";
import { About } from "./Components/About/About";
import { CardDetail } from "./Components/CardDetail/CardDetail";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { CheckOutSuccess } from "./Components/CheckOutSuccess/CheckOutSuccess";
import { CartProvider } from "./Components/Cart/CartContext";
import CartBanner from "./Components/Cart/CartDetail";
import Orders from "./Components/Orders/Orders";
import { NavBar } from "./Components/NavBar/NavBar";
import { Footer } from "./Components/Footer/Footer";

import { Acount } from "./Components/Acount/Acount";
import Cart from "./Components/Cart/Cart";

export default function App() {
  return (
    <div className="App">
      <CartProvider>
        <NavBar />
        <Cart />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={LandingPage} />
          <Route exact path="/cartDetail" component={CartBanner} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/form" component={Form} />
          <Route exact path="/help" component={Help} />
          <Route exact path="/about" component={About} />
          <Route exact path="/acount" component={Acount} />
          <Route exact path="/checkout-success" component={CheckOutSuccess} />
          <Route
            exact
            path="/detail/:id"
            component={({ match }) => <CardDetail match={match} />}
          />
          <Route exact path="/settings" component={Orders} />
          <Route exact path="*" component={Error} />
        </Switch>
        <Footer />
      </CartProvider>
    </div>
  );
}
