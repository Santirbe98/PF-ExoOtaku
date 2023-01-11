import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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
import Customer from "./Components/SignIn/SingIn";
import { Acount } from "./Components/Acount/Acount";
import Cart from "./Components/Cart/Cart";
import { useAuth0 } from "@auth0/auth0-react";
import { Ban } from "./Components/Ban/Ban";

export default function App() {
  const customer = useSelector((state) => state.chk_customer);
  const { user, isAuthenticated } = useAuth0();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && customer !== null && customer.deleted === true) {
      history.push("/ban");
    }
  });

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
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/ban" component={Ban} />
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
