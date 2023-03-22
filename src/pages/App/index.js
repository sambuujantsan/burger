import React, { Component, useEffect, useState } from "react";
import css from "./style.module.css";
import { connect } from "react-redux";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";
import OrderPage from "../OrderPage";
import { Redirect, Route, Switch } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import login from "../LoginPage"
import SignUp from "../SignUp";
import LogOut from "../../components/Logout/index";
import * as actions from "../../redux/actions/LogInActions";
import * as SignUpActions from "../../redux/actions/SignUpActions";

const App = props => {
  const [showSidebar, setshowSidebar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expireDate = new Date(localStorage.getItem('expireDate'));
    if (token) {
      if (expireDate > new Date()) {
        props.autoLogin(token, userId);
        props.AutoLogOut(expireDate.getTime() - new Date().getTime());
      } else {
        //token's time expired
        props.LogOut();
      }
    }

  })

  const toggleSideBar = () => {
    setshowSidebar(prevShowSideBar => !prevShowSideBar)
  };
  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />

      <SideBar
        showSidebar={showSidebar}
        toggleSideBar={toggleSideBar}
      />

      <main className={css.Content}>
        {props.userId ? (
          <Switch>
            <Route path="/orders" component={OrderPage} />
            <Route path="/ship" component={ShippingPage} />
            <Route path="/Log-Out" component={LogOut} />
            <Route path="/" component={BurgerPage} />
          </Switch>
        ) : (<Switch>
          <Route path="/Sign-Up" component={SignUp} />
          <Route path="/Login-In" component={login} />
          <Redirect to="Login-In" />
        </Switch>
        )}
      </main>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    userId: state.SignUpreducer.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (token, userId) => dispatch(actions.LogInUserSuccess(token, userId)),
    LogOut: () => dispatch(SignUpActions.LogOutUser()),
    AutoLogOut: () => dispatch(SignUpActions.AutoLogOut()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
