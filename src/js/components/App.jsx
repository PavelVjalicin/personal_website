import React, {Component} from "react"
import {TopNav} from "./TopNav";
import {Route, Switch} from "react-router-dom";
import {Skills} from "./pages/skills/Skills";
import {Git} from "./pages/github/Git";
import {NotFound} from "./pages/NotFound";
import Container from "@material-ui/core/Container";
import {About} from "./pages/about/About";
import {Experience} from "./pages/experience/Experience";
import {Contact} from "./pages/contact/Contact";
import {Footer} from "./Footer";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div style={{position:"relative",minHeight:"100vh",paddingBottom:80}}>
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
                <div style={{paddingTop:20,paddingBottom:20}}>
                    <Switch>
                        <Route path={"/about"} exact>
                            <About/>
                        </Route>
                        <Route path={"/work"} exact>
                            <Experience/>
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
            <Footer/>
        </div>
    }
}

export {App}