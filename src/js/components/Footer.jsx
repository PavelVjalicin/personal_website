import React, {Component} from "react"
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <AppBar color={'default'} position={"absolute"} style={{top:"auto",bottom:0,padding:20}}>
            <Grid container justify={"flex-end"}>
                <Typography color={"textSecondary"}>
                    Copyright &copy; 2020 Pavel Vjalicin.
                </Typography>
                <Typography color={"textSecondary"}  style={{paddingLeft:10}}>
                    All rights reserved.
                </Typography>
            </Grid>
        </AppBar>
    }
}

export {Footer}