import App from "./components/App/App";
import React from "react";
import {Provider} from "react-redux";
import store from "./store/store";

const ReactDOM = require('react-dom');

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
document.querySelector("#app")
)