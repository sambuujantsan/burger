import React, { Component } from "react";
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

class App extends Component {
  state = {
    showSidebar: false
  };

  toggleSideBar = () => {
    this.setState(prevState => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireDate = new Date(localStorage.getItem('expireDate'));
    if (token) {
      if (expireDate > new Date()) {
        this.props.autoLogin(token, userId);
        this.props.AutoLogOut(expireDate.getTime() - new Date().getTime());
      } else {
        //token's time expired
        this.props.LogOut();
      }
    }
  }
  render() {
    return (
      <div>
        <Toolbar toggleSideBar={this.toggleSideBar} />

        <SideBar
          showSidebar={this.state.showSidebar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
          {this.props.userId ? (
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
