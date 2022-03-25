import React from "react";
import Input from 'react-toolbox/lib/input'
import {Button} from "react-toolbox/lib/button";
import {getAll, login, register} from "../../api/request";
import store from "../../store/store";
import {connect} from "react-redux";
import Alert from '@mui/material/Alert';

class LoginForm extends React.Component {
    state = {
        values: {
            username: "",
            password: "",
        },
        errors: {
            username: "",
            pass: "",
            info: ""
        }
    };

    constructor(props) {
        super(props);
    }

    handleChange = (name, value) => {
        let error = this.inputError(name, value)
        this.setState({
            values: {...this.state.values, [name]: value},
            errors: {...this.state.errors, [name]: error}

        });
    };

    showSnackbar = (msg) => {
        store.dispatch({type: 'snackbar', value: {active: true, label: msg}});
    }

    inputError = (name, value) => {
        switch (name) {
            case "username":
                if (value.charAt(0) >= '0' && value.charAt(0) <= '9') {
                    return "Username must starts with a letter";
                }
                if (value.length > 20 && value.length < 5) {
                    return "Username must be less than 20 and more than 5 symbols";
                }
                if (value === "") {
                    return "null"
                }
                return ''
            case "pwd":
                if (value.length > 25 && value.length < 5) {
                    return "Password must be at least 6 characters long";
                }
                return "";
            default:
                return '';
        }
    }

    validate = (name, value) => {
        switch (name) {
            case "username":
                if (value.length < 5 || value.length > 20) {
                    this.showSnackbar("Username must be less than 20 and more than 5 symbols")
                    return "Username must be less than 20 and more than 5 symbols";
                }
                return "";
            case "password":
                if (value.length < 5 || value.length > 25) {
                    this.showSnackbar("Password must be less than 25 symb and more than 5")
                    return "Password must be less than 25 symb and more than 5";
                }
                return "";
            default:
                return "";
        }
    }

    login = () => {
        login(this.state.values.username, this.state.values.password).then(response => response.json().then(
            json => {
                if (response.ok) {
                    sessionStorage.setItem("token", json.accessToken);
                    sessionStorage.setItem("refreshToken", json.refreshToken);
                    store.dispatch({type: "login", value: {login: true, username: this.state.values.username}});
                    console.log(response)
                    getAll()
                        .then(response => {
                            if (response.ok) {
                                response.text().then(text => {
                                    console.log(json)
                                    this.props.dispatch({type: "setChecks", value: JSON.parse(text)})
                                })
                            } else {
                                this.showSnackbar(json.message)
                            }
                        })
                } else {
                    this.showSnackbar(json.message)
                    console.log(json.message)
                }
            }))
    }


    register = () => {
        register(this.state.values.username, this.state.values.password).then(response => response.json().then(
            json => {
            if (response.ok) {
                sessionStorage.setItem("token", response.accessToken);
                sessionStorage.setItem("refreshToken", response.refreshToken);
                store.dispatch({type: "login", value: {login: true, username: this.state.values.username}});
                console.log(response)
            } else {
                this.showSnackbar(json.message)
            }
        }))
    }


    render() {
        console.log(store.getState().snackbar.label)
        return (
            <div className="login-form">
                <Input type="text"
                       label="username"
                       name="username"
                       value={this.state.values.username}
                       onChange={this.handleChange.bind(this, "username")}
                       maxLength={20}
                       error={this.state.errors.username}

                />
                <Input type="password"
                       label="password"
                       name="password"
                       value={this.state.values.password}
                       onChange={this.handleChange.bind(this, "password")}
                       maxLength={25}
                       error={this.state.errors.pass}
                />
                <Button label="Login"
                        onClick={this.login}
                        primary
                />
                <Button label="Register"
                        onClick={this.register}
                />
                {store.getState().snackbar.active &&
                    <Alert severity="error">{store.getState().snackbar.label}</Alert>
                }
                {store.getState().snackbar.active = false}
            </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        isFetchingError: state.snackbar.active
    }
}

export default connect(mapStateToProps)(LoginForm);
