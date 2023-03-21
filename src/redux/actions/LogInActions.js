import axios from "axios";
import * as actions from "./SignUpActions"

export const LogInUser = (email, password) => {
    return function (dispatch) {

        dispatch(LogInUserStart());
        const data = {
            email,
            password,
            returnSecureToken: true
        };

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAL_0ZY8v73r-aj9nG5ssgbMWfNxSHBPPM", data)
            .then(result => {
                //LocalStrorage-рүү userID , Token шиднэ
                const token = result.data.idToken;
                const userId = result.data.localId;
                const expiresIn = result.data.expiresIn;
                const expireDate = new Date(new Date().getTime() + expiresIn * 1000)
                const refreshToken = result.data.refreshToken;

                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("expireDate", expireDate);

                dispatch(LogInUserSuccess(token, userId));
                dispatch(actions.AutoLogOut(expiresIn * 1000));
            })
            .catch(error => {
                dispatch(LogInUserError(error))
            });

    };
};

export const LogInUserStart = () => {
    return {
        type: "LOGIN_USER_START"
    };
};

export const LogInUserSuccess = (token, userId) => {
    return {
        type: "LOGIN_USER_SUCCESS",
        token,
        userId
    };
};

export const LogInUserError = (error) => {
    return {
        type: "LOGIN_USER_ERROR",
        error
    };
};