import React from "react";
import LoginForm from "./LoginForm";
import AppHeader from "../../components/Header/AppHeader";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-page">
                <AppHeader />
                <LoginForm/>
            </div>
        );

    }
}

export default LoginPage;