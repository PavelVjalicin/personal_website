import React, {Component} from "react"
import {LineAnimation} from "./LineAnimation";
import {PageTitle} from "../../PageTitle";
import {ExperienceSection} from "./ExperienceSection";
import Typography from "@material-ui/core/Typography";
import {Anchor} from "../../Anchor";
import Grid from "@material-ui/core/Grid";

export default class Experience extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const Line = () => <hr style={{borderColor:"#f50057"}}/>
        const Paragraph = (props) => <div style={{paddingBottom:40}}>{props.children}</div>
        return <>
            <LineAnimation/>
            <PageTitle>Experience</PageTitle>
            <ExperienceSection from={"June 2017"}
                               to={"Present"}
                               company={"Softar Consulting Limited"}
                               position={"Lead Software Engineer"}>
                <Typography>
                    Responsible for design and implementation of Softar's web development environment.
                </Typography>
                <Typography>
                    Lead developer for un-announced web based Retirement Planning Tool.
                </Typography>
                <Typography>
                    Developed automated HMRC VAT tool to comply with Making Tax Digital programme.
                </Typography>
                <Typography>
                    Worked with clients to design and implement software based business solutions.
                </Typography>
                <br/>
                <Typography>
                    Worked with: React (JavaScript), Play Framework (Scala), Symfony (PHP), ASP.NET / Core (C#),
                    MariaDB, OpenAPI.
                </Typography>
            </ExperienceSection>
            <ExperienceSection from={"2014"}
                               to={"2017"}
                               position={"Freelance Work"}>
                <Typography>
                    Worked with local businesses to resolve a wide-range of
                    IT/Graphics&nbsp;Design/Software challenges.
                    Primarily focusing on tasks with highly specialised skill requirements.
                </Typography>
                <br/>
                <Typography>
                    Worked on: interactive online advertisements, company logos, business cards, posters.
                    Developed a wide variety of Apps based on client needs.
                </Typography>
            </ExperienceSection>
            <ExperienceSection from={"2007"}
                               to={"2016"}
                               position={"Independent Game Developer"}>
                <Typography>
                    Developed simple video games for video game websites/mobile phones.
                    Negotiated video game sponsorship deals.
                    Worked with small teams of video game developers.
                    Lead end-to-end production.
                </Typography>
                <br/>
                <Typography>
                    Technologies used: Adobe Flash (ActionScript) and Unity3D (C#).
                </Typography>
            </ExperienceSection>
            <Paragraph>
                <Typography variant={"h5"}>Education</Typography>
                <Line/>
                <Typography>Institute for Apprenticeships & Technical Education Software Developer Level 4 (2019)</Typography>
                <div style={{paddingLeft:20}}>
                    <Typography>
                        <Anchor href={"public/pv_qa_portfolio_clean.pdf"}>Apprenticeship Portfolio</Anchor>
                    </Typography>
                    <Typography>
                        Synoptic Project (C#&nbsp;ASP.NET&nbsp;Core&nbsp;REST&nbsp;API)
                    </Typography>
                    <div style={{paddingLeft:20}}>
                        <Typography>
                            <Anchor href={"public/pv_qa_synoptic_project_design.pdf"}>Design&nbsp;Document</Anchor>
                        </Typography>
                        <Typography>
                            <Anchor href={"https://github.com/PavelVjalicin/qa_synoptic_project"}>Github&nbsp;Repository</Anchor>
                        </Typography>
                    </div>
                </div>
                <Typography>Graduated from Vilnius "Juventos" gymnasium (2014)</Typography>
            </Paragraph>
            <Paragraph>
                <Typography variant={"h5"}>Certifications</Typography>
                <Line/>
                <Typography>BCS Level 4 Diploma in Software Languages (2019)</Typography>
                <Typography>BCS Certificate in Systems Development Essentials (2018)</Typography>

            </Paragraph>
            <Paragraph>
                <Typography color={"textSecondary"}>* Certification documents are available upon request.</Typography>
            </Paragraph>
        </>
    }
}