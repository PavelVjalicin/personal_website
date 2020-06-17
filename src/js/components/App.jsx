import React, {Component} from "react"
import {TopNav} from "./TopNav";
import {Route,Switch} from "react-router-dom";
import {About} from "./pages/About";
import {Work} from "./pages/Work";
import {Skills} from "./pages/Skills";
import {Git} from "./pages/Git";
import {Contact} from "./pages/Contact";
import {NotFound} from "./pages/NotFound";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <TopNav links={[
                ["/about","About me"],
                ["/work","Work Experience"],
                ["/skills","Technical Skills"],
                ["/github","GitHub"],
                ["/contact","Contact Me"]
            ]}/>
            <Switch>
                <Route path={"/about"} exact>
                    <About/>
                </Route>
                <Route path={"/work"} exact>
                    <Work/>
                </Route>
                <Route path={"/skills"} exact>
                    <Skills/>
                </Route>
                <Route path={"/github"} exact>
                    <Git/>
                </Route>
                <Route path={"/contact"} exact>
                    <Contact/>
                </Route>
                <Route path={"/"} exact>
                    <About/>
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </>
    }
}

export {App}