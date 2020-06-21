import React, {Component} from "react"
import {StarRating} from "./StarRating";
import {PageTitle} from "../../PageTitle";
import {SkillsSection} from "./SkillsSection";
import {SkillsAnimation} from "./SkillsAnimation";

class Skills extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <SkillsAnimation/>
            <PageTitle>Technical Skills</PageTitle>
            <SkillsSection title={"Programming Languages"}>
                <StarRating rating={10}>Scala</StarRating>
                <StarRating rating={10}>JavaScript</StarRating>
                <StarRating rating={10}>TypeScript</StarRating>
                <StarRating rating={9}>Java</StarRating>
                <StarRating rating={8}>PHP</StarRating>
                <StarRating rating={8}>ActionScript</StarRating>
                <StarRating rating={7}>C#</StarRating>
                <StarRating rating={5}>Python</StarRating>
                <StarRating rating={3}>C++</StarRating>
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
                <StarRating rating={9}>Bootstrap</StarRating>
                <StarRating rating={9}>Graph.js</StarRating>
                <StarRating rating={8}>D3.js</StarRating>
                <StarRating rating={7}>WebGL</StarRating>
                <StarRating rating={5}>Angular</StarRating>
            </SkillsSection>
            <SkillsSection title={"Tools"}>
                <StarRating rating={10}>IntelliJ IDE</StarRating>
                <StarRating rating={10}>Visual Studio Code</StarRating>
                <StarRating rating={10}>PHPStorm</StarRating>
                <StarRating rating={9}>Adobe Flash</StarRating>
                <StarRating rating={9}>GIT</StarRating>
                <StarRating rating={8}>PowerPoint</StarRating>
                <StarRating rating={7}>Word</StarRating>
                <StarRating rating={7}>Photoshop</StarRating>
                <StarRating rating={6}>Unity3D</StarRating>
                <StarRating rating={6}>Inkscape</StarRating>
                <StarRating rating={6}>Visual Studio IDE</StarRating>
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

export {Skills}