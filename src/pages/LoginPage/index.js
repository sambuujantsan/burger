import { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/LogInActions"
import css from "./style.module.css";
import Button from "../../components/General/Button";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/General/Spinner";

const Login = props => {
    const [mail, SetMail] = useState("");
    const [pword, SetPword] = useState("");

    const login = () => {
        props.login(mail, pword);
    };
    const Email = (e) => {
        SetMail(e.target.value);
    };
    const Password = (e) => {
        SetPword(e.target.value);
    };

    return (
        <div className={css.Login}>

            {props.userId && <Redirect to="/" />}

            <input onChange={Email} type="text" placeholder="Имэйл хаяг"></input>
            <input onChange={Password} type="password" placeholder="Нууц үг"></input>
            {props.LogginIn && <Spinner />}
            {props.firebaseError && (<div style={{ color: "red" }}>
                {props.firebaseError} код нь : {props.firebaseErrorCode}
            </div>)}
            <Button text="Нэвтрэх" btnType="Success" daragdsan={login} />
        </div>
    )
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