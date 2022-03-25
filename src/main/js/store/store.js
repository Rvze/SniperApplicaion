import {createStore} from "redux";

const initialState = {
    login: sessionStorage.getItem("login"),
    points: [],
    r: 1,
    snackbar: {
        active: false,
        label: ""
    }
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            sessionStorage.setItem("login", action.value)
            state.login = action.value
            state.points = null
            return state;
        case "appendCheck":
            state.points.push(action.value)
            return state;
        case "changeRadius":
            sessionStorage.setItem("radius", action.value)
            state.r = action.value
            return state
        case "setChecks":
            sessionStorage.setItem("points", action.value);
            console.log(action.value)
            return {...state, points: action.value}
        case "logOut":
            return {...state, login: null}
        case "snackbar":
            return {...state, snackbar: {active: action.value.active, label: action.value.label}}
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);
export default store;