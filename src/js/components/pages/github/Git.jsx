import React, {Component} from "react"
import Typography from "@material-ui/core/Typography";
import {GitRepositories} from "./GitRepositories";
import {Anchor} from "../../Anchor";
import {SquareManager} from "./SquareManager";
import {PageTitle} from "../../PageTitle";
import NoSsr from "@material-ui/core/NoSsr";
import {Helmet} from "react-helmet";

export default class Git extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <Helmet>
                <title>Pavel Vjalicin - GitHub</title>
                <meta name={"description"} content={"GitHub repositories of Pavel Vjalicin"} />
            </Helmet>
            <NoSsr>
                <SquareManager/>
            </NoSsr>
            <PageTitle>GitHub</PageTitle>
            <Anchor href={"https://github.com/PavelVjalicin?tab=repositories"}>View on GitHub</Anchor>
            <GitRepositories pinnedRepos={[
                "PavelVjalicin/personal_website",
                "PavelVjalicin/js_rendering_engine",
                "PavelVjalicin/scalajs_template_engine"
            ]}/>
        </>
    }
}

export {Git}
