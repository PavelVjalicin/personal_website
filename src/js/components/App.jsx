import React, {Component, Suspense} from "react"
import {Route, Switch} from "react-router-dom";
import {NotFound} from "./pages/NotFound";
import Container from "@material-ui/core/Container";
import Loadable from 'react-loadable';
import Theme from "./Theme";

function Loading(props) {
    return <div>Loading...</div>;
}

function EmptyLoading(props) {
    return <></>
}

const Experience = Loadable({
    loader: () => import(/* webpackChunkName: "Experience", webpackPrefetch: true */ './pages/experience/Experience'),
    loading: Loading
})
const Skills = Loadable({
    loader: () => import(/*webpackChunkName: "Skills", webpackPrefetch: true */ "./pages/skills/Skills"),
    loading: Loading
})
const Git = Loadable({
    loader: () => import(/*webpackChunkName: "Git", webpackPrefetch: true  */ "./pages/github/Git"),
    loading: Loading
})
const About = Loadable({
    loader: () => import(/*webpackChunkName: "About", webpackPrefetch: true */ "./pages/about/About"),
    loading: Loading
})
const Contact = Loadable({
    loader: () => import(/*webpackChunkName: "Contact", webpackPrefetch: true */ "./pages/contact/Contact"),
    loading: Loading
})
const TopNav = Loadable({
    loader: () => import(/*webpackChunkName: "TopNav", webpackPrefetch: true */ "./TopNav"),
    loading: Loading
})
const Footer = Loadable({
    loader: () => import(/*webpackChunkName: "Footer", webpackPrefetch: true */ "./Footer"),
    loading: Loading
})



class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {



        const page =  <div style={{position:"relative",minHeight:"100vh",paddingBottom:60}}>
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

        function ThemeLoading(props) {
            return page
        }

        const Theme = Loadable({
            loader: () => import(/*webpackChunkName: "Theme", webpackPrefetch: true */ "./Theme"),
            loading: ThemeLoading,
            render(loaded,props) {
                let Theme = loaded.default;
                return <Theme {...props} />
            }
        })


        return <Theme>{page}</Theme>
    }
}

export {App}
