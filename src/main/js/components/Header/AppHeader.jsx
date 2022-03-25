import React from "react";
import store from "../../store/store";
import {connect} from "react-redux";
import AppBar from "react-toolbox/lib/app_bar";
import "./Header.module.css"

class AppHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    logout = () => {
        store.dispatch({type: "login", value: null})
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("refreshToken")
    }

    logOutButton = this.props.login && this.props.login != null ? (
        <a className="login-button" onClick={this.logout} href="">{this.props.title}</a>
    ) : ''

    render() {
        console.log(this.props)
        let title = "Nurgun Makarov Group: P3214" + "      " + "Variant : 29557";
        return (
            <AppBar className="header" title={title}>
                <div>
                    {this.logOutButton}
                </div>

            </AppBar>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.login)
    return {
        login: state.login
    };
}

export default connect(mapStateToProps)(AppHeader);