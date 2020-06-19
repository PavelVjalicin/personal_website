import React, {Component} from "react"
import {TopNav} from "./TopNav";
import {Route, Switch} from "react-router-dom";
import {About} from "./pages/About";
import {Work} from "./pages/Work";
import {Skills} from "./pages/Skills";
import {Git} from "./pages/github/Git";
import {Contact} from "./pages/Contact";
import {NotFound} from "./pages/NotFound";
import Container from "@material-ui/core/Container";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <TopNav links={[
                ["/about","About me"],
                ["/work","Experience"],
                ["/skills","Skills"],
                ["/github","GitHub"],
                ["/contact","Contact Me"]
            ]}/>
            <Container style={{
                borderLeft:5,
                borderLeftStyle:"solid",
                borderColor:"#f50057",
                position:"relative"
            }}>
                <div style={{paddingTop:20}}>
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
                </div>
            </Container>
        </>
    }
}

export {App}