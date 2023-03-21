import { Component } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/SignUpActions";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/General/Spinner";
class SignUp extends Component {
    state = {
        email: "",
        password: "",
        password2: "",
        error: "дахиад оролдооч"
    };
    ChangeEmail = (e) => {
        this.setState({ email: e.target.value })
    };
    Password1 = (e) => {
        this.setState({ password: e.target.value })
    };
    Password2 = (e) => {
        this.setState({ password2: e.target.value })
    };
    SignUp = () => {
        if (this.state.password === this.state.password2) {
            this.props.signupUser(this.state.email, this.state.password);

        }
        else {
            this.setState({ error: "салгалсан хухай минь адилхан юм хийлдээ" });
        }
    };

    render() {
        return (
            <div className={css.SignUp}>
                {this.props.userId && <Redirect to="/" />}
                <h1>БҮРТГЭЛИЙН ФОРМ</h1>
                <input onChange={this.ChangeEmail} type="text" placeholder="Имэйл хаяг"></input>
                <input onChange={this.Password1} type="password" placeholder="Нууц үг"></input>
                <input onChange={this.Password2} type="password" placeholder="Нууц үг давтана уу"></input>
                {this.state.error && (
                    <div style={{ color: "red" }}>{this.state.error}</div>
                )}
                {this.props.firebaseError && (
                    <div style={{ color: "red" }}>
                        {this.props.firebaseError}
                    </div>
                )}
                {this.props.LogginIn && <Spinner />}
                <Button text="Бүртгүүлэх" btnType="Success" daragdsan={this.SignUp} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        firebaseError: state.SignUpreducer.firebaseError,
        userId: state.SignUpreducer.userId,
        LogginIn: state.SignUpreducer.LogginIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupUser: (email, password) => dispatch(actions.SignUpUser(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)