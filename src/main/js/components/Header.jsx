import React from 'react';
import AppBar from "react-toolbox/lib/app_bar";
import store from "../store/store";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    logout = () => {
        store.dispatch({type: 'login', value: {login: false, username: ""}});
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('refreshToken');
    }

    render() {
        let title = "Nurgun Makarov, P3214, Variant: 29557"
        return (
            <AppBar
                title={title}
                rightIcon={store.getState().login && store.getState().login != null ? "logout" : ""}
                onRightIconClick={this.logout}>
            </AppBar>
        )
    }
}

export default Header;