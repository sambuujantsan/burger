import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/LogInActions"
import css from "./style.module.css";
import Button from "../../components/General/Button";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/General/Spinner";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };
    login = () => {
        this.props.login(this.state.email, this.state.password);
    };
    Email = (e) => {
        this.setState({ email: e.target.value })
    };
    Password = (e) => {
        this.setState({ password: e.target.value })
    };

    render() {
        return (
            <div className={css.Login}>

                {this.props.userId && <Redirect to="/" />}

                <input onChange={this.Email} type="text" placeholder="Имэйл хаяг"></input>
                <input onChange={this.Password} type="password" placeholder="Нууц үг"></input>
                {this.props.LogginIn && <Spinner />}
                {this.props.firebaseError && (<div style={{ color: "red" }}>
                    {this.props.firebaseError} код нь : {this.props.firebaseErrorCode}
                </div>)}
                <Button text="Нэвтрэх" btnType="Success" daragdsan={this.login} />
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        LogginIn: state.SignUpreducer.LogginIn,
        firebaseError: state.SignUpreducer.firebaseError,
        firebaseErrorCode: state.SignUpreducer.firebaseErrorCode,
        userId: state.SignUpreducer.userId
    };
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(actions.LogInUser(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);