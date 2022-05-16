import React, {Component} from "react"
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <AppBar color={'default'} position={"absolute"} style={{top:"auto",bottom:0,padding:20}}>
            <Grid container justify={"flex-end"}>
                <Typography color={"textSecondary"}>
                    Copyright &copy; 2022 Pavel Vjalicin.
                </Typography>
                <Typography color={"textSecondary"}  style={{paddingLeft:10}}>
                    All rights reserved.
                </Typography>
            </Grid>
        </AppBar>
    }
}