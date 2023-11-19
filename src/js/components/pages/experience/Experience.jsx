import React, { Component } from "react"
import { LineAnimation } from "./LineAnimation";
import { PageTitle } from "../../PageTitle";
import { ExperienceSection } from "./ExperienceSection";
import Typography from "@mui/material/Typography";
import { Anchor } from "../../Anchor";
import NoSsr from "@mui/material/NoSsr";
import { Helmet } from "react-helmet";

export default class Experience extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const Line = () => <hr style={{ borderColor: "#f50057" }} />
        const Paragraph = (props) => <div style={{ paddingBottom: 40 }}>{props.children}</div>
        return <>
            <Helmet>
                <title>Pavel Vjalicin - Work Experience and Education</title>
                <meta name={"description"} content={"Pavel Vjalicin - Work experience and education"} />
            </Helmet>
            <NoSsr>
                <LineAnimation />
            </NoSsr>
            <PageTitle>Experience</PageTitle>
            <ExperienceSection from={"July 2022"}
                to={"Present"}
                company={"Mercator Digital"}
                position={"Scala Developer"}>
            </ExperienceSection>
            <ExperienceSection from={"August 2020"}
                to={"July 2022"}
                company={"White Bullet Solutions Limited"}
                position={"Full-Stack Software Engineer (Contract)"}>
                <Typography>
                    Worked with product owners to design and implement new features and modernise old ones across the whole stack.
                </Typography>
                <br/>
                <Typography>
                    Developed a custom Android OS, designed for automated crawling of applications with physical devices. Created a scalable method of installing custom OS across hundreds of Pixel 2 devices.
                </Typography>
                <br/>
                <Typography>
                    Extensive work with AWS using web console, Java, Scala, JavaScript. Worked on performance diagnostics, cost optimisations. Worked with EC2, SQS, Lambda, CloudWatch, S3, RDS, AMI, ECS, CodeCommit, Spot, SNS, DynamoDB.
                </Typography>
                <br/>
                <Typography>
                    Found and achieved 100x performance improvements on multiple services with architecture changes.
                </Typography>
                <br/>
                <Typography>
                    Worked together with an AI contractor to integrate an Image Classification AI tool with existing codebase in a scalable, robust and maintainable way.
                </Typography>
                <br/>
                <Typography>
                    Introduced a modern front-end development environment for White Bullet. TypeScript, React, modern JavaScript,  testing environment. Replaced existing internal UI tools with more maintainable, more  functional, faster versions.
                </Typography>
                <br/>
                <Typography>
                    Introduced additional CI/CD pipelines for some of the services. (GoCD)
                </Typography>
                <br/>
                <Typography>
                    Introduced additional automated testing.
                </Typography>
                <br/>
                <Typography>
                    Stack: Scala, Play Framework, AWS,  Docker, Java, React, TypeScript, Postgresql
                </Typography>
            </ExperienceSection>
            <ExperienceSection from={"August 2020"}
                to={"Present"}
                company={"Vjalicin Technologies LTD"}
                position={"Managing Director"}>
            </ExperienceSection>
            <ExperienceSection from={"June 2017"}
                to={"August 2020"}
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
                <br />
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
                <br />
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
                <br />
                <Typography>
                    Technologies used: Adobe Flash (ActionScript) and Unity3D (C#).
                </Typography>
            </ExperienceSection>
            <Paragraph>
                <Typography variant={"h5"}>Education</Typography>
                <Line />
                <Typography>Institute for Apprenticeships & Technical Education Software Developer Level 4 (2019)</Typography>
                <div style={{ paddingLeft: 20 }}>
                    <Typography>
                        <Anchor href={"public/pv_qa_portfolio_clean.pdf"}>Apprenticeship Portfolio</Anchor>
                    </Typography>
                    <Typography>
                        Synoptic Project (C#&nbsp;ASP.NET&nbsp;Core&nbsp;REST&nbsp;API)
                    </Typography>
                    <div style={{ paddingLeft: 20 }}>
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
                <Line />
                <Typography>BCS Level 4 Diploma in Software Languages (2019)</Typography>
                <Typography>BCS Certificate in Systems Development Essentials (2018)</Typography>

            </Paragraph>
            <Paragraph>
                <Typography color={"textSecondary"}>* Certification documents are available upon request.</Typography>
            </Paragraph>
        </>
    }
}
