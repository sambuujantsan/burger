import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/SignUpActions"
import { useEffect } from "react";
const LogOut = (props) => {

    useEffect(() => {
        props.LogOut();
    }, []);

    return <Redirect to="/" />

}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.LogOutUser())
    };
};
export default connect(null, mapDispatchToProps)(LogOut);