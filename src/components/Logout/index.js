import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../redux/actions/SignUpActions"
class LogOut extends React.Component {
    componentDidMount = () => {
        this.props.logout();
    };
    render() {
        return <Redirect to="/" />
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.LogOutUser())
    };
};
export default connect(null, mapDispatchToProps)(LogOut);