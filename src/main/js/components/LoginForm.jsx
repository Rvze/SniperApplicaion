import React from "react";
import Input from 'react-toolbox/lib/input'
import {Button} from "react-toolbox/lib/button";
import {login, register} from "../api/request";
import store from "../store/store";


class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    constructor(props) {
        super(props);
    }

    handleChange = (name, value) => {
        this.setState({
            ...this.state, [name]: value
        });
    };

    validate = (name, value) => {
        switch (name) {
            case "username":
                if (value.length < 5 || value.length > 20) {
                    return "Username must be less than 20 and more than 5 symbols";
                }
                return "";
            case "password":
                if (value.length < 5 || value.length > 25) {
                    return "Password must be less than 25 symb and more than 5";
                }
                return "";
            default:
                return "";
        }
    }

    login = () => {
        login(this.state.username, this.state.password).then(response => response.json().then(
            json => {
                if (response.ok) {
                    sessionStorage.setItem("token", json.accessToken);
                    sessionStorage.setItem("refreshToken", json.refreshToken);
                    store.dispatch({type: "login", value: {login: true, username: this.state.username}});

                } else {
                    return "Error";
                }
            }
        ))
    }

    register = () => {
        register(this.state.username, this.state.password).then(response => response.json().then(() => {
            if (response.ok) {
                this.login();
            }
        }))
    }


    render() {
        return (
            <div className="login-form">
                <Input type="text"
                       label="username"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange.bind(this, "username")}
                       maxLength={20}
                />
                <Input type="password"
                       label="password"
                       name="password"
                       value={this.state.password}
                       onChange={this.handleChange.bind(this, "password")}
                       maxLength={25}/>
                <Button label="Login"
                        onClick={this.login}
                />
                <Button label="Register"
                        onClick={this.register}
                />

            </div>
        )
    }
}

export default LoginForm;
