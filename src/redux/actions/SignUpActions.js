import axios from "axios";
import { LogInUserSuccess } from "./LogInActions"

export const SignUpUser = (email, password) => {
    return function (dispatch) {

        dispatch(SignUpUserStart());
        const data = {
            email,
            password,
            returnSecureToken: true
        };

        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAL_0ZY8v73r-aj9nG5ssgbMWfNxSHBPPM", data)
            .then(result => {
                const token = result.data.idToken;
                const userId = result.data.localId;
                //LocalStorage - рүү token userId шиднэ
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);

                dispatch(SignUpUserSuccess(token, userId))
            })
            .catch(error => {
                dispatch(SignUpUserError(error))
            });

    };
};

export const SignUpUserStart = () => {
    return {
        type: "SIGNUP_USER_START"
    };
};

export const SignUpUserSuccess = (token, userId) => {
    return {
        type: "SIGNUP_USER_SUCCESS",
        token,
        userId
    };
};

export const SignUpUserError = (error) => {
    return {
        type: "SIGNUP_USER_ERROR",
        error
    };
};
export const LogOutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expireDate')
    return {
        type: "LOGOUT_USER"
    };
};
export const AutoLogOut = ms => {
    return function (dispatch) {
        //refreshing token
        //https://securetoken.googleapis.com/v1/token?key=[API_KEY]
        axios.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyAL_0ZY8v73r-aj9nG5ssgbMWfNxSHBPPM", {
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem('refreshToken'),
        }
        )
            .then(result => {
                const token = result.data.id_token;
                const userId = result.data.user_id;
                //LocalStorage - рүү token userId шиднэ
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);

                dispatch(LogInUserSuccess(token, userId))
            })
            .catch(error => {
                dispatch(SignUpUserError(error))
            });
    }


    /* return function (dispatch) {
         setTimeout(() => { dispatch(LogOutUser()) }, ms)  Calculating LogOut timer
    }; */
};