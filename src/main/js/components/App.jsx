import React from "react";
import LoginPage from "./LoginPage";
import store from "../store/store";
import MainPage from "./MainPage";

class App extends React.Component {
    render() {
        return (
            <div className="app">
                {store.getState().login && store.getState().login != null &&
                store.getState().login !== undefined ?
                    <MainPage/> : <LoginPage/>
                }
            </div>
        )
    }
}

export default App;