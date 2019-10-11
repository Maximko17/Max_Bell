import React, { Component } from "react";
import Header from "../src/components/ru/main-components/header/header";
import Footer from "../src/components/ru/main-components/footer/footer";
import Landing from "../src/components/ru/main-components/lending/lending";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ItemList from "./components/ru/navbar-components/item-list/item-list";
import Order from "./components/ru/navbar-components/order/order";
import Full from "./components/ru/navbar-components/full/full";
import { Provider } from "react-redux";
import store from "./store";
import AddItem from "./components/ru/navbar-components/add-update-item/add-item/add-item";
import UpdateItem from "./components/ru/navbar-components/add-update-item/update-item/update-item";
import LoginHeader from "./components/ru/main-components/login-header/login-header";
import Login from "./components/ru/security-components/login-page/login";
import setJWTToken from "../src/security-utils/setJWTToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./action/types";
import { logout } from "./action/security-actions";
import SecureRoute from "./security-utils/secure-route";
import OrderDetails from "./components/ru/navbar-components/order/order-details/order-details";
import PreviousOrders from "./components/ru/navbar-components/order/previous-orders/previous-orders";
import Landing_en from "./components/en/main-components/lending/lending";
import ItemList_en from "./components/en/navbar-components/item-list/item-list";
import Full_en from "./components/en/navbar-components/full/full";
import AddItem_en from "./components/en/navbar-components/add-update-item/add-item/add-item";
import UpdateItem_en from "./components/en/navbar-components/add-update-item/update-item/update-item";
import Login_en from "./components/en/security-components/login-page/login";
import Order_en from "./components/en/navbar-components/order/order";
import OrderDetails_en from "./components/en/navbar-components/order/order-details/order-details";
import PreviousOrders_en from "./components/en/navbar-components/order/previous-orders/previous-orders";
import LoginHeader_en from "./components/en/main-components/login-header/login-header";
import Header_en from "./components/en/main-components/header/header";
import Footer_en from "./components/en/main-components/footer/footer";
import { getCookie } from "./cookie-utils/language-cookie";
import searchOutput from "./components/ru/main-components/search/search-output";
import SearchOutput_en from "./components/en/main-components/search/search-output";
import AddItemImage from "./components/ru/navbar-components/add-update-item/add-item-image/add-item-image";
import AddItemImage_en from "./components/en/navbar-components/add-update-item/add-item-image/add-item-image";
import Registration from "./components/ru/security-components/login-page/registration";
import Registration_en from "./components/en/security-components/login-page/registration";
import EditProfile from "./components/ru/security-components/edit-profile/edit-profile";
import EditProfile_en from "./components/en/security-components/edit-profile/edit-profile";
import AdminPanel from "./components/ru/security-components/admin-panel/admin-panel";
import AdminPanel_en from "./components/en/security-components/admin-panel/admin-panel";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);

  const decode_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode_jwtToken
  });

  const current_time = Date.now() / 1000;
  if (decode_jwtToken.exp < current_time) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    let loginHeader;
    let header;
    let footer;

    if (getCookie("LANGUAGE")) {
      loginHeader = <LoginHeader_en />;
      header = <Header_en />;
      footer = <Footer_en />;
    } else {
      loginHeader = <LoginHeader />;
      header = <Header />;
      footer = <Footer />;
    }

    return (
      <Provider store={store}>
        <Router>
          <div>
            {loginHeader}
            {header}

            {/* Public Routes */}
            {/* RU */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/catalog/:url" component={ItemList} />
            <Route
              exact
              path={`/catalog/search/:input/:sort`}
              component={searchOutput}
            />
            <Route exact path="/catalog/full/:id" component={Full} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />

            {/* EN */}
            <Route exact path="/en/" component={Landing_en} />
            <Route exact path="/en/catalog/:url" component={ItemList_en} />
            <Route
              exact
              path={`/en/catalog/search/:input/:sort`}
              component={SearchOutput_en}
            />
            <Route exact path="/en/catalog/full/:id" component={Full_en} />
            <Route exact path="/en/login" component={Login_en} />
            <Route exact path="/en/registration" component={Registration_en} />

            {/* Private Routes */}
            <Switch>
              {/* RU */}
              <SecureRoute exact path="/order" component={Order} />
              <SecureRoute
                exact
                path="/orderDetails"
                component={OrderDetails}
              />
              <SecureRoute
                exact
                path="/prevOrders"
                component={PreviousOrders}
              />
              <SecureRoute exact path="/edit" component={EditProfile} />
              <SecureRoute
                exact
                path="/catalog/clothes/update/:id"
                component={UpdateItem}
              />
              <SecureRoute
                exact
                path="/catalog/clothes/add"
                component={AddItem}
              />
              <SecureRoute
                exact
                path="/catalog/clothes/add/images/:id"
                component={AddItemImage}
              />
              <SecureRoute exact path="/admin-panel" component={AdminPanel} />

              {/* EN */}
              <SecureRoute exact path="/en/order" component={Order_en} />
              <SecureRoute
                exact
                path="/en/orderDetails"
                component={OrderDetails_en}
              />
              <SecureRoute
                exact
                path="/en/prevOrders"
                component={PreviousOrders_en}
              />
              <SecureRoute exact path="/en/edit" component={EditProfile_en} />
              <SecureRoute
                exact
                path="/en/catalog/clothes/update/:id"
                component={UpdateItem_en}
              />
              <SecureRoute
                exact
                path="/en/clothes/add"
                component={AddItem_en}
              />
              <SecureRoute
                exact
                path="/en/catalog/clothes/add/images/:id"
                component={AddItemImage_en}
              />
              <SecureRoute
                exact
                path="/en/admin-panel"
                component={AdminPanel_en}
              />
            </Switch>
            {footer}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
