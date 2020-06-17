import React, {Component} from "react"
import Typography from "@material-ui/core/Typography";
import {GitRepositories} from "./GitRepositories";
import {Anchor} from "../../Anchor";
import {SquareManager} from "./SquareManager";

class Git extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <SquareManager/>
            <Typography variant={"h3"}>GitHub</Typography>
            <Anchor href={"https://github.com/PavelVjalicin?tab=repositories"}>View on GitHub</Anchor>
            <GitRepositories/>
        </>
    }
}

export {Git}