import { useState } from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../../components/General/Button";
import * as actions from "../../redux/actions/SignUpActions";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/General/Spinner";
const SignUp = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [error, setError] = useState("дахиад оролдооч");

    const ChangeEmail = (e) => {
        setEmail(e.target.value)
    };
    const Password1 = (e) => {
        setPassword(e.target.value)
    };
    const Password2 = (e) => {
        setSecondPassword(e.target.value)
    };
    const SignIn = () => {
        if (password === secondPassword) {
            props.signupUser(email, password);

        }
        else {
            setError("салгалсан хухай минь адилхан юм хийлдээ")
        }
    };
    return (
        <div className={css.SignUp}>
            {props.userId && <Redirect to="/" />}
            <h1>БҮРТГЭЛИЙН ФОРМ</h1>
            <input onChange={ChangeEmail()} type="text" placeholder="Имэйл хаяг"></input>
            <input onChange={Password1()} type="password" placeholder="Нууц үг"></input>
            <input onChange={Password2()} type="password" placeholder="Нууц үг давтана уу"></input>
            {error && (
                <div style={{ color: "red" }}>{error}</div>
            )}
            {props.firebaseError && (
                <div style={{ color: "red" }}>
                    {props.firebaseError}
                </div>
            )}
            {props.LogginIn && <Spinner />}
            <Button text="Бүртгүүлэх" btnType="Success" daragdsan={SignIn} />
        </div>
    )
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