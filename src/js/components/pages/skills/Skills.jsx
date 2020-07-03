import React, {Component} from "react"
import {StarRating} from "./StarRating";
import {PageTitle} from "../../PageTitle";
import {SkillsSection} from "./SkillsSection";
import {SkillsAnimation} from "./SkillsAnimation";

export default class Skills extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <SkillsAnimation/>
            <PageTitle>Skills</PageTitle>
            <SkillsSection title={"Programming Languages"}>
                <StarRating rating={10}>Scala</StarRating>
                <StarRating rating={10}>JavaScript</StarRating>
                <StarRating rating={10}>TypeScript</StarRating>
                <StarRating rating={9}>Java</StarRating>
                <StarRating rating={8}>C#</StarRating>
                <StarRating rating={8}>PHP</StarRating>
                <StarRating rating={8}>ActionScript</StarRating>
                <StarRating rating={5}>Python</StarRating>
                <StarRating rating={3}>C++</StarRating>
            </SkillsSection>
            <SkillsSection title={"Operating Systems"}>
                <StarRating rating={8}>Windows</StarRating>
                <StarRating rating={8}>Linux</StarRating>
                <StarRating rating={6}>Android</StarRating>
            </SkillsSection>
            <SkillsSection title={"Server Frameworks"}>
                <StarRating rating={10}>Play Framework</StarRating>
                <StarRating rating={9}>NodeJS</StarRating>
                <StarRating rating={7}>Symfony</StarRating>
                <StarRating rating={6}>ASP.NET Core</StarRating>
                <StarRating rating={5}>ASP.NET</StarRating>
                <StarRating rating={3}>Akka HTTP</StarRating>
            </SkillsSection>
            <SkillsSection title={"Web Client-Side Technologies"}>
                <StarRating rating={10}>React</StarRating>
                <StarRating rating={10}>Material-UI</StarRating>
                <StarRating rating={10}>HTML</StarRating>
                <StarRating rating={10}>CSS</StarRating>
                <StarRating rating={10}>SCSS</StarRating>
                <StarRating rating={10}>LESS</StarRating>
                <StarRating rating={10}>JQuery</StarRating>
                <StarRating rating={10}>Bootstrap</StarRating>
                <StarRating rating={9}>WebPack</StarRating>
                <StarRating rating={9}>Graph.js</StarRating>
                <StarRating rating={8}>D3.js</StarRating>
                <StarRating rating={7}>WebGL</StarRating>
                <StarRating rating={5}>Angular</StarRating>
            </SkillsSection>
            <SkillsSection title={"Network"}>
                <StarRating rating={10}>Restful API</StarRating>
                <StarRating rating={10}>Open API</StarRating>
                <StarRating rating={10}>Web-Sockets</StarRating>
                <StarRating rating={10}>TCP/IP</StarRating>
                <StarRating rating={10}>Ajax</StarRating>
                <StarRating rating={10}>HTTP</StarRating>
                <StarRating rating={10}>HTTP/2</StarRating>
                <StarRating rating={10}>Server-Sent Events</StarRating>
                <StarRating rating={7}>WebRTC</StarRating>
            </SkillsSection>
            <SkillsSection title={"Network Security"}>
                <StarRating rating={10}>SQLi</StarRating>
                <StarRating rating={10}>XSS</StarRating>
                <StarRating rating={10}>HTTPS</StarRating>
                <StarRating rating={10}>TOR</StarRating>
                <StarRating rating={10}>CORS</StarRating>
                <StarRating rating={10}>oAuth</StarRating>
                <StarRating rating={10}>Logging</StarRating>
            </SkillsSection>
            <SkillsSection title={"Software Design"}>
                <StarRating rating={10}>OOP</StarRating>
                <StarRating rating={10}>Event Driven Programming</StarRating>
                <StarRating rating={10}>ORM</StarRating>
                <StarRating rating={10}>Data-flow</StarRating>
                <StarRating rating={10}>TDD</StarRating>
                <StarRating rating={10}>Test Automation</StarRating>
                <StarRating rating={9}>Design Patterns</StarRating>
                <StarRating rating={8}>Database Relations</StarRating>
                <StarRating rating={8}>UML</StarRating>
                <StarRating rating={8}>Data Structures</StarRating>
                <StarRating rating={8}>User Experience</StarRating>
                <StarRating rating={8}>Material Design</StarRating>
                <StarRating rating={7}>Functional Programming</StarRating>
                <StarRating rating={7}>Meta Programming</StarRating>
                <StarRating rating={7}>Compile-Time Safety</StarRating>
                <StarRating rating={7}>Concurrent Programming</StarRating>
                <StarRating rating={6}>Debugging</StarRating>
                <StarRating rating={6}>Profiling</StarRating>
                <StarRating rating={6}>Encryption</StarRating>
                <StarRating rating={6}>Algorithms</StarRating>
                <StarRating rating={5}>Micro Services</StarRating>
                <StarRating rating={5}>Distributed Systems</StarRating>
                <StarRating rating={4}>Neural Networks</StarRating>
                <StarRating rating={4}>Machine Learning</StarRating>
                <StarRating rating={4}>Actor Model</StarRating>
                <StarRating rating={2}>Blockchain</StarRating>
            </SkillsSection>
            <SkillsSection title={"Mathematics"}>
                <StarRating rating={8}>Statistics</StarRating>
                <StarRating rating={7}>Linear Algebra</StarRating>
                <StarRating rating={7}>Calculus</StarRating>
                <StarRating rating={6}>Multivariable Calculus</StarRating>
            </SkillsSection>
            <SkillsSection title={"Tools"}>
                <StarRating rating={10}>IntelliJ IDE</StarRating>
                <StarRating rating={10}>Visual Studio Code</StarRating>
                <StarRating rating={10}>PHPStorm</StarRating>
                <StarRating rating={10}>Selenium</StarRating>
                <StarRating rating={9}>Adobe Flash</StarRating>
                <StarRating rating={9}>GIT</StarRating>
                <StarRating rating={8}>PowerPoint</StarRating>
                <StarRating rating={8}>Android Studio</StarRating>
                <StarRating rating={7}>Word</StarRating>
                <StarRating rating={7}>Photoshop</StarRating>
                <StarRating rating={6}>Unity3D</StarRating>
                <StarRating rating={6}>Inkscape</StarRating>
                <StarRating rating={6}>Visual Studio IDE</StarRating>
                <StarRating rating={6}>Docker</StarRating>
                <StarRating rating={5}>Excel</StarRating>
                <StarRating rating={4}>GIMP</StarRating>
                <StarRating rating={3}>Sony Vegas Pro</StarRating>
                <StarRating rating={3}>Blender</StarRating>
            </SkillsSection>
            <SkillsSection title={"Languages"}>
                <StarRating rating={10}>Russian</StarRating>
                <StarRating rating={8}>English</StarRating>
                <StarRating rating={7}>Lithuanian</StarRating>
            </SkillsSection>
        </>
    }
}