import React from "react";
import store from "../store/store";
import {Dropdown} from "react-toolbox/lib/dropdown";
import {Input} from "react-toolbox/lib/input";
import {Button} from "react-toolbox/lib/button";
import {check, clear, getAll} from "../api/request"
import ResTable from "./ResTable";


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
            x: "",
            y: "",
            r: "",
            hit: false
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
        if (name === "r") {
            store.dispatch({type: "changeR", value: value})
            this.setState({...this.state, [name]: value})
        }
        this.setState({...this.state, [name]: value})
    }

    validateInput = () => {
        let y = this.state.y;
        if (isNaN(y)) {
            console.log("Y must be a number!")
            return false;
        }
        if (y < -3 || y > 5) {
            console.log("Y must be on range [-3;5]")
            return false;
        }
        if (y === "") {
            console.log("Y is not set")
            return false;
        }
        return true;
    }

    submitButton = () => {
        if (this.validateInput()) {
            check({
                x: this.state.x,
                y: this.state.y,
                r: this.state.r,
                hit: this.state.hit
            }).then(response => response.json().then(json => {
                    if (response.ok) {
                        store.dispatch({type: "appendCheck", value: json});
                    }
                }
            ))
        }
    }

    clear = () => {
        clear().then(response => response.json().then(json => {
            if (response.ok) {
                store.dispatch({type: "setChecks", value: []})
            }
        }))
    }

    render() {
        return (
            <div className="main-form" style={{width: '50%', marginRight: 'auto'}}>
                <Dropdown
                    auto
                    label="X"
                    name="x"
                    onChange={this.handleChange.bind(this, "x")}
                    source={xVal}
                    value={this.state.x}
                    required
                />
                <Input type="text"
                       label="Y"
                       name="y"
                       value={this.state.y}
                       onChange={this.handleChange.bind(this, "y")}
                       maxLength={10}
                       required
                />
                <Dropdown source={rVal}
                          auto
                          label="R"
                          name="r"
                          value={this.state.r}
                          onChange={this.handleChange.bind(this, "r")}
                          required/>
                <ResTable coordinateX={"X"} coordinateY={"Y"} radius={"R"}
                          result={"Result"} localDateTime={"LocalDateTime"}
                          points={store.getState().points}/>
                <Button label="submit"
                        onClick={this.submitButton}/>
                <Button label="clear"
                        onClick={this.clear}/>
            </div>
        )
    }
}

export default MainForm;