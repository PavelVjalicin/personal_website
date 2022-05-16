import React, {Component} from "react"
import {Section} from "../../Section";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

class SkillsSection extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const left = []
        const right = []
        this.props.children.forEach((x,i) =>
            //i % 2 === 0 ? left.push(x) : right.push(x)
            i < this.props.children.length / 2 ? left.push(x) : right.push(x)
        )
        return <div style={{paddingTop:20}}>
            <Section>{this.props.title}</Section>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Box borderLeft={1} borderColor={"primary.main"}>
                        {left}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box borderLeft={1} borderColor={"primary.main"}>
                        {right}
                    </Box>
                </Grid>
            </Grid>
        </div>
    }
}

export {SkillsSection}