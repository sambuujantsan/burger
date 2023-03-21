const initialState = {
    saving: false,
    LogginIn: false,
    firebaseError: null,
    firebaseErrorCode: null,
    token: null,
    userId: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGNUP_USER_START": return {
            ...state,
            LogginIn: true,
            saving: true
        };
        case "SIGNUP_USER_SUCCESS": return {
            ...state,
            LogginIn: false,
            saving: false,
            token: action.token,
            userId: action.userId,
        };
        case "SIGNUP_USER_ERROR": return {
            ...state,
            LogginIn: false,
            saving: false,
            firebaseError: action.error.response.data.error.message,
            firebaseErrorCode: action.error.response.data.error.code
        };
        case "LOGIN_USER_START":
            return {
                ...state,
                LogginIn: true
            };
        case "LOGIN_USER_SUCCESS": return {
            ...state,
            LogginIn: false,
            saving: false,
            token: action.token,
            userId: action.userId,
        };
        case "LOGIN_USER_ERROR": return {
            ...state,
            LogginIn: false,
            firebaseError: action.error.response.data.error.message,
            firebaseErrorCode: action.error.response.data.error.code,
        };
        case "LOGOUT_USER": return {
            ...state,
            token: null,
            userId: null,
            firebaseError: null,
            firebaseErrorCode: null,
        };
        default:
            return state;
    };
}

export default reducer;