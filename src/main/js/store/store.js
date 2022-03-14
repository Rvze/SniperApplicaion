import {createStore} from "redux";

const initialState = {
    login: sessionStorage.getItem("login"),
    points: [],
    r: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            sessionStorage.setItem("login", action.value.login)
            return {
                ...state,
                r: action.value.login === null ? null : state.r,
                login: action.value.login,
                points: []
            };
        case "appendCheck":
            return {...state, points: [...state.points, action.value]};
        case "changeRadius":
            return {...state, r: action.value}
        case "setChecks":
            sessionStorage.setItem("points", action.value);
            console.log(action.value)
            return {...state, points: action.value}
        default:
            return state;
    }
}

const store = createStore(reducer, initialState);
const radiusStore = createStore(reducer, "changeRadius")
export default store;