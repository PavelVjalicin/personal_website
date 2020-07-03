import React, {Component, Suspense} from "react"
import {TopNav} from "./TopNav";
import {Route, Switch} from "react-router-dom";

import {NotFound} from "./pages/NotFound";
import Container from "@material-ui/core/Container";

import {Footer} from "./Footer";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const Experience = React.lazy(() => import(/* webpackChunkName: "Experience" */ './pages/experience/Experience'))

        const Skills = React.lazy( () => import(/*webpackChunkName: "Skills"*/ "./pages/skills/Skills"))
        const Git = React.lazy( () => import(/*webpackChunkName: "Git"*/ "./pages/github/Git"))
        const About = React.lazy( () => import(/*webpackChunkName: "About"*/ "./pages/about/About"))
        const Contact = React.lazy( () => import(/*webpackChunkName: "Contact"*/ "./pages/contact/Contact"))

        return <div style={{position:"relative",minHeight:"100vh",paddingBottom:60}}>
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
                <Suspense fallback={<div>Loading...</div>}>
                    <div style={{paddingTop:20,paddingBottom:40}}>
                        <Switch>
                            <Route path={"/about"} exact>
                                <About/>
                            </Route>
                            <Route path={"/work"} component={Experience} exact/>
                            <Route path={"/skills"} exact component={Skills} />
                            <Route path={"/github"} exact component={Git}/>
                            <Route path={"/contact"} exact component={Contact}/>
                            <Route path={"/"} exact component={About}/>
                            <Route>
                                <NotFound/>
                            </Route>
                        </Switch>
                    </div>
                </Suspense>
            </Container>
            <Footer/>
        </div>
    }
}

export {App}