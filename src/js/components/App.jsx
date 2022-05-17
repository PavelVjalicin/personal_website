import React, { Component } from "react"
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import Container from "@mui/material/Container";
import loadable from '@loadable/component'
import ScrollToTop from "./ScrollToTop";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from 'react-error-boundary';
import { Error } from "./Error";

const Experience = loadable(() => import(/* webpackChunkName: "Experience", webpackPrefetch: true */ './pages/experience/Experience'))
const Skills = loadable(() => import(/*webpackChunkName: "Skills", webpackPrefetch: true */ "./pages/skills/Skills"))
const Git = loadable(() => import(/*webpackChunkName: "Git", webpackPrefetch: true  */ "./pages/github/Git"))
const About = loadable(() => import(/*webpackChunkName: "About", webpackPrefetch: true */ "./pages/about/About"))
const Contact = loadable(() => import(/*webpackChunkName: "Contact", webpackPrefetch: true */ "./pages/contact/Contact"))
const TopNav = loadable(() => import(/*webpackChunkName: "TopNav", webpackPrefetch: true */ "./TopNav"))
const Footer = loadable(() => import(/*webpackChunkName: "Footer", webpackPrefetch: true */ "./Footer"))
const Blog = loadable(() => import(/*webpackChunkName: "Blog", webpackPrefetch: true */ "./pages/blog/Blog"))
const BlogPost = loadable(() => import(/*webpackChunkName: "BlogPost", webpackPrefetch: true */ "./pages/blog/BlogPost"))



class App extends Component {
    constructor(props) {
        super(props)
        if (props.data) {
            window.app = {
                data: props.data
            }
        }
    }


    render() {

        /*<Route index element={<About />} />
                                <Route path={"work/work"} />
                                <Route path={"skills"} element={<Skills />} />
                                <Route path={"github"} element={<Git />} />
                                <Route path={"contact"} element={<Contact />} />
                                <Route path={"blog"}>
                                    <Route index element={<Blog />} />
                                    <Route path=":id" element={<BlogPost />}></Route>
                                </Route>
                                <Route path="*" element={<NotFound />} />*/

        return <>
            <ScrollToTop />
            <div style={{ position: "relative", minHeight: "100vh", paddingBottom: 60 }}>
                <TopNav links={[
                    ["/", "About me"],
                    ["/work", "Experience"],
                    ["/skills", "Skills"],
                    ["/github", "GitHub"],
                    ["/blog", "Blog"],
                    ["/contact", "Contact Me"],

                ]} />
                <Container style={{
                    borderLeft: 5,
                    borderLeftStyle: "solid",
                    borderColor: "#f50057",
                    position: "relative"
                }}>
                    <div style={{ paddingTop: 20, paddingBottom: 40 }}>
                        <Routes>
                            <Route index element={<About />} />
                            <Route path={"work"} element={<Experience />} />
                            <Route path={"skills"} element={<Skills />} />
                            <Route path={"github"} element={<Git />} />
                            <Route path={"contact"} element={<Contact />} />
                            <Route path={"blog"}>
                                <Route index element={<Blog />} />
                                <Route path=":id" element={<BlogPost />}></Route>
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Container>
                <Footer />
            </div>
            <CssBaseline />
        </>
    }
}

export { App }
