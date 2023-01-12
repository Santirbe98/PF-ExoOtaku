import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
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
  const { isAuthenticated } = useAuth0();
  const history = useHistory();
  const [isBan, setIsBan] = useState(false);

  useEffect(() => {
    if (isAuthenticated && customer !== null && customer.deleted === true) {
      setIsBan(true);
      history.push("/ban");
    } else setIsBan(false);
  });

  return (
    <div className="App">
      <CartProvider>
        <NavBar />
        <Cart />
        <Switch>
          <Route exact path="/" component={!isBan ? LandingPage : Ban} />
          <Route exact path="/home" component={!isBan ? LandingPage : Ban} />
          <Route
            exact
            path="/cartDetail"
            component={!isBan ? CartBanner : Ban}
          />
          <Route exact path="/shop" component={!isBan ? Shop : Ban} />
          <Route exact path="/form" component={!isBan ? Form : Ban} />
          <Route exact path="/help" component={!isBan ? Help : Ban} />
          <Route exact path="/about" component={!isBan ? About : Ban} />
          <Route exact path="/acount" component={!isBan ? Acount : Ban} />
          <Route
            exact
            path="/checkout-success"
            component={!isBan ? CheckOutSuccess : Ban}
          />
          <Route exact path="/customer" component={!isBan ? Customer : Ban} />
          <Route exact path="/ban" component={Ban} />
          <Route
            exact
            path="/detail/:id"
            component={({ match }) =>
              !isBan ? <CardDetail match={match} /> : Ban
            }
          />
          <Route exact path="/settings" component={!isBan ? Orders : Ban} />
          <Route exact path="*" component={Error} />
        </Switch>
        <Footer />
      </CartProvider>
    </div>
  );
}
