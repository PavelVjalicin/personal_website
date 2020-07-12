import React, {Component} from "react"
import {AboutAnimation} from "./AboutAnimation";
import {PageTitle} from "../../PageTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {Anchor} from "../../Anchor";
import NoSsr from "@material-ui/core/NoSsr";
import {Helmet} from "react-helmet";

export default class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const Paragraph = (props) => <div style={{paddingTop:20}}>{props.children}</div>
        return <Grid item xs={12} md={9}>
            <Helmet>
                <title>Pavel Vjalicin - About Me</title>
                <meta name={"description"} content={"About Pavel Vjalicin"} />
            </Helmet>
            <NoSsr>
                <AboutAnimation/>
            </NoSsr>
            <PageTitle>About Me</PageTitle>
            <Paragraph>
                <Typography>
                    Hi, I am Pavel Vjalicin. Born and raised in Vilnius, Lithuania, currently in United Kingdom since 2017.
                    <br/>
                    A professional software engineer since 2007.
                </Typography>
            </Paragraph>
            <Paragraph>
                <Typography>
                    I am a (mostly) self-taught software engineer with a very broad set of skills.
                    <br/>
                    I started my career by learning how to program Flash based video games in ActionScript and soon turned my hobby into a profitable business.
                    Soon after, I started to receive numerous requests to help out local businesses with various IT / Graphic&nbsp;Design / Software challenges.
                    And that's how I got into free-lance Programming/Graphics&nbsp;Design.
                </Typography>
            </Paragraph>
            <Paragraph>
                <Typography>
                    As time passed, I realised that my software skills began to stagnate.
                    I felt like the technical challenges presented to me were not challenging enough anymore.
                    After all, you can only do so much in a country with such a small market like Lithuania.
                    So I did the most sensible thing I could think of.
                    I bought a one-way ticket to London with no real plan behind it and never looked back.
                </Typography>
            </Paragraph>
            <Paragraph>
                <Typography>
                    From then on, I have been employed as a Lead Software Engineer, developing a web development environment for my company,
                    working with our clients to design and implement software based business solutions.
                    Learning about software architecture, primarily studying: various Web Technologies, Machine Learning, Neural Networks and distributed systems.
                </Typography>
            </Paragraph>
            <Paragraph>
                <Typography>
                    Currently, I am seeking any type of software design/development opportunities.
                    Feel free to contact me if you have any questions or you think I can help you in any way.
                </Typography>
            </Paragraph>
            <Paragraph>
                <Typography style={{float:"right"}}>- Pavel Vjalicin</Typography>
            </Paragraph>
            <br/>
        </Grid>
    }
}
