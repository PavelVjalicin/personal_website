import React, {Component} from "react"
import Typography from "@material-ui/core/Typography";
import {GitRepositories} from "./GitRepositories";
import {Anchor} from "../../Anchor";
import {SquareManager} from "./SquareManager";
import {PageTitle} from "../../PageTitle";

export default class Git extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <SquareManager/>
            <PageTitle>GitHub</PageTitle>
            <Anchor href={"https://github.com/PavelVjalicin?tab=repositories"}>View on GitHub</Anchor>
            <GitRepositories pinnedRepos={[
                "PavelVjalicin/personal_website",
                "PavelVjalicin/js_rendering_engine"
            ]}/>
        </>
    }
}

export {Git}