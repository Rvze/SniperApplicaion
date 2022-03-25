import React from "react";
import {connect} from "react-redux";
import LoginForm from "../../pages/LoginPage/LoginForm";
import MainForm from "../../pages/MainPage/MainForm";
import AppHeader from "../Header/AppHeader";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.login)
        return (
            <div className="first-page">
                <AppHeader title = "Login Page"/>
                {this.props.login !== "null" && this.props.login  ? <MainForm/> : <LoginForm/>}
            </div>


        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login
    };
}

export default connect(mapStateToProps)(App)

