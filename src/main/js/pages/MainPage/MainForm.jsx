import React from "react";
import store from "../../store/store";
import {Dropdown} from "react-toolbox/lib/dropdown";
import {Input} from "react-toolbox/lib/input";
import {Button} from "react-toolbox/lib/button";
import {check, clear, getAll} from "../../api/request"
import ResTable from "../../components/Table/ResTable";


import Graph from "../../components/Graph/Graph";
import $ from "jquery";
import {connect} from "react-redux";
import {value} from "lodash/seq";
import styles from "./MainForm.module.css"
import Alert from "@mui/material/Alert";

const xVal = [
    {value: -5, label: -5},
    {value: -4, label: -4},
    {value: -3, label: -3},
    {value: -2, label: -2},
    {value: -1, label: -1},
    {value: 0, label: 0},
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5}
]

const rVal = [
    {value: 1, label: 1},
    {value: 2, label: 2},
    {value: 3, label: 3},
    {value: 4, label: 4},
    {value: 5, label: 5}
]

class MainForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            info: "",
            values: {
                x: "",
                y: "",
                r: 1,
                hit: false
            },
            errors: {
                x: "",
                y: "",
            }
        }
    }


    componentDidMount() {
        getAll()
            .then(response => {
                if (response.ok) {
                    response.text().then(text => {
                        store.dispatch({type: "setChecks", value: JSON.parse(text)})
                    })
                }
            })
        this.setState({points: store.getState().points});
        this.unsubscribe = store.subscribe(() => {
            this.setState({points: store.getState().points});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleChange = (name, value) => {
        let error = this.inputError(name, value);
        if (name === "r") {
            store.dispatch({type: "changeRadius", value: value})
            this.setState({...this.state, [name]: value})
        }
        this.setState({
            values: {...this.state.values, [name]: value},
            errors: {...this.state.errors, [name]: error},
            info: {...this.state.info, [name]: error}
        })
        console.log(store.getState().r, this.state.r)

    }

    inputError = (name, value) => {
        switch (name) {
            case "x":
                if (isNaN(value)) {
                    return "X must be a number";
                }
                if (value < -5 || value > 5) {
                    return "X value must be in [-5; 5]";
                }
                return "";
            case "y":
                if (isNaN(value)) {
                    return "Y must be a number";
                }
                if (value < -3 || value > 5) {
                    return "Y value must be in [-3; 5]";
                }
                return "";
            case 'r':
                if (isNaN(value)) {
                    return "R must be a number";
                }
                if (value < 1 || value > 5) {
                    return "R value must be in [1; 5]";
                }
                return "";
            default:
                return "";
        }
    }

    validateInput = () => {
        let x = this.state.values.x
        let y = parseFloat(this.state.values.y);
        if (y === undefined) {
            this.showSnackbar("Y is not set")
            return false;
        }

        if (isNaN(y)) {
            console.log("Y must be a number!")
            this.showSnackbar("Y must be a number!")
            return false;
        }
        if (y < -3 || y > 5) {
            console.log("Y must be on range [-3;5]")
            this.showSnackbar("Y must be on range [-3;5]")
            return false;
        }
        if (y === "") {
            console.log("Y is not set")
            this.showSnackbar("Y is not set")
            return false;
        }
        if (x === "") {
            this.showSnackbar("X is not set")
            return false;
        }
        if (x < -5 || x > 5) {
            this.showSnackbar("X value must be in [-5; 5]")
            return false;
        }
        if (isNaN(x)) {
            this.showSnackbar("X must be a number!")
            return false;
        }
        return true;
    }

    submitButton = () => {
        if (this.validateInput()) {
            check({
                x: this.state.values.x,
                y: this.state.values.y,
                r: this.state.values.r,
                hit: this.state.values.hit
            }).then(response => response.json().then(json => {
                    if (response.ok) {
                        store.dispatch({type: "appendCheck", value: json});
                    } else
                        this.showSnackbar(json.message)
                }
            ))
        }

    }

    clear = () => {
        clear().then(response => response.json().then(() => {
            if (response.ok) {
                store.dispatch({type: "setChecks", value: []})

            }
        }))
        $("tbody tr").each(function () {
            $("#pointId").remove();
        })
    }

    changeRadius(radius) {
        store.dispatch({type: "changeRadius", value: radius})
    }

    showSnackbar = (msg) => {
        store.dispatch({type: 'snackbar', value: {active: true, label: msg}});
    }

    render() {
        console.log(this.state.info)
        console.log(store.getState().snackbar.active)
        return (
            <div style={{width: '100%', marginRight: 'auto', marginLeft: "auto"}} className={styles.pointForm}>

                <div className={styles.form} style={{
                    borderRadius: "1rem",
                    backgroundColor: "#efefef",
                    width: "40rem",
                    margin: "auto",
                    marginTop: "3rem",
                    marginBottom: "3rem"
                }}>
                    <Dropdown
                        className={styles.xForm}
                        style={{borderRadius: "0.5rem", borderStyle: "inset", borderColor: "red"}}
                        auto
                        label="X"
                        name="x"
                        onChange={this.handleChange.bind(this, "x")}
                        source={xVal}
                        value={this.state.values.x}
                        error={this.state.errors.x}
                        required
                    />
                    <Input style={{borderRadius: "0.5rem", borderStyle: "inset", borderColor: "#B8860B"}}
                           className={styles.yForm}
                           type="text"
                           label="Y"
                           name="y"
                           value={this.state.values.y}
                           onChange={this.handleChange.bind(this, "y")}
                           maxLength={10}
                           required
                           error={this.state.errors.y}
                           auto
                    />
                    <Dropdown style={{borderRadius: "0.5rem", borderStyle: "inset", borderColor: "#90EE90"}}
                              className={styles.rForm}
                              source={rVal}
                              auto
                              label="R"
                              name="r"
                              value={this.state.r}
                              onChange={this.handleChange.bind(this, "r")}
                              required
                    />
                </div>
                <Graph/>
                <ResTable coordinateX={"X"} coordinateY={"Y"} radius={"Radius"}
                          result={"Result"} points={store.getState().points}/>
                <div>
                    {store.getState().snackbar.active &&
                        <Alert severity="error">{store.getState().snackbar.label}</Alert>
                    }

                    <Button label="submit"
                            onClick={this.submitButton}
                    />
                </div>
                <div>
                    <Button label="clear"
                            onClick={this.clear}

                    />
                </div>


            </div>
        )
    }
}

const mapToStateProps = (state) => {
    return {
        points: state.points,
        radius: state.r,
        login: state.login,
    };
}

export default connect(mapToStateProps)(MainForm);