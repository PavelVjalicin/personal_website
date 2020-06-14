import React, {Component} from "react"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class TopNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <AppBar color={'default'} position={"fixed"}>
            <Toolbar>
                <Typography variant={"h6"}>Personal website of Pavel Vjalicin</Typography>
            </Toolbar>

        </AppBar>
    }
}

export {TopNav}