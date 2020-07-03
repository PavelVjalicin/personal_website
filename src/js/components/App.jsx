import React, {Component, Suspense} from "react"
import {Route, Switch} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Container from "@material-ui/core/Container";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const Experience = React.lazy(() => import(/* webpackChunkName: "Experience", webpackPrefetch: true */ './pages/experience/Experience'))

        const Skills = React.lazy( () => import(/*webpackChunkName: "Skills", webpackPrefetch: true */ "./pages/skills/Skills"))
        const Git = React.lazy( () => import(/*webpackChunkName: "Git", webpackPrefetch: true  */ "./pages/github/Git"))
        const About = React.lazy( () => import(/*webpackChunkName: "About", webpackPrefetch: true */ "./pages/about/About"))
        const Contact = React.lazy( () => import(/*webpackChunkName: "Contact", webpackPrefetch: true */ "./pages/contact/Contact"))
        const TopNav = React.lazy(() => import(/*webpackChunkName: "TopNav", webpackPrefetch: true */ "./TopNav"))
        const Footer = React.lazy(() => import(/*webpackChunkName: "Footer", webpackPrefetch: true */ "./Footer"))
        const Theme = React.lazy(() => import(/*webpackChunkName: "Theme", webpackPrefetch: true */ "./Theme"))

        const page = <div style={{position:"relative",minHeight:"100vh",paddingBottom:60}}>
            <Suspense fallback={<></>}>
                <TopNav links={[
                    ["/about","About me"],
                    ["/work","Experience"],
                    ["/skills","Skills"],
                    ["/github","GitHub"],
                    ["/contact","Contact Me"]
                ]}/>
            </Suspense>
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
            <Suspense fallback={<></>}>
                <Footer/>
            </Suspense>
        </div>



        return <Suspense fallback={page}><Theme>{page}</Theme></Suspense>
    }
}

export {App}