import React, {Component} from "react"
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {OpenInNew} from "@material-ui/icons";
import {GitRepositories} from "./GitRepositories";
import {Anchor} from "./Anchor";

class Git extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <Typography variant={"h3"}>GitHub</Typography>
            <Anchor href={"https://github.com/PavelVjalicin?tab=repositories"}>View on GitHub</Anchor>
            <GitRepositories/>
        </>
    }
}

export {Git}