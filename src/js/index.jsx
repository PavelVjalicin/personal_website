import "core-js/stable/object/assign"  // safari 9 polyfill Object.assign
import "core-js/stable/object/entries"  // safari 9 polyfill Object.entries
import "core-js/stable/object/values" // safari 9 polyfill Object.values
import 'url-search-params-polyfill'; //safari 9 polyfill new URLSearchParams
import "regenerator-runtime/runtime" // For core-js
import ReactDOM from "react-dom"
import React from "react"
import {App} from "./components/App";
import "../css/main.scss"
import {loadableReady} from "@loadable/component";
import {BrowserRouter} from "react-router-dom";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {theme} from "../../server/theme";

function Main() {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const react = document.getElementById("react")
if(react.childNodes.length === 0) {
    ReactDOM.render(
        <Main/>, react)
} else {
    /*loadableReady(() => {
        ReactDOM.hydrate(
            <Main/>, react)
    })*/
}


//Used for dev auto-refresh

/*const socket = new WebSocket("ws://"+window.location.host)

socket.addEventListener("open", (e) => {
    socket.send("open")
})

socket.addEventListener("message",(e) => {
    if(e.data === "refresh") {
        window.location.reload()
    }
})*/
