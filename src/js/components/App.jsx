import React, {Component} from "react"
import {Route, Switch} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Container from "@material-ui/core/Container";
import loadable from '@loadable/component'
import ScrollToTop from "./ScrollToTop";
import CssBaseline from "@material-ui/core/CssBaseline";


const Experience = loadable( () => import(/* webpackChunkName: "Experience", webpackPrefetch: true */ './pages/experience/Experience'))
const Skills = loadable( () => import(/*webpackChunkName: "Skills", webpackPrefetch: true */ "./pages/skills/Skills"))
const Git = loadable( () => import(/*webpackChunkName: "Git", webpackPrefetch: true  */ "./pages/github/Git"))
const About = loadable( () => import(/*webpackChunkName: "About", webpackPrefetch: true */ "./pages/about/About"))
const Contact = loadable( () => import(/*webpackChunkName: "Contact", webpackPrefetch: true */ "./pages/contact/Contact"))
const TopNav = loadable( () => import(/*webpackChunkName: "TopNav", webpackPrefetch: true */ "./TopNav"))
const Footer = loadable( () => import(/*webpackChunkName: "Footer", webpackPrefetch: true */ "./Footer"))



class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        return <>
            <ScrollToTop/>
            <div style={{position:"relative",minHeight:"100vh",paddingBottom:60}}>
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
                </Container>
                <Footer/>
            </div>
            <CssBaseline/>
        </>
    }
}

export {App}
