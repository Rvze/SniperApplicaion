import React from "react";
import LoginForm from "./LoginForm";
import Header from "./Header";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login-page">
                <Header/>
                <LoginForm/>
            </div>
        );
    }
}

export default LoginPage;