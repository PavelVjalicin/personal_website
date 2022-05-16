import React, {Component} from "react"
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
class ExperienceSection extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const Line = () => <hr style={{borderColor:"#f50057"}}/>

        return <div style={{paddingTop:20,paddingBottom:40}}>
            <Typography>
                {this.props.from} - {this.props.to}
            </Typography>
            <Grid container >
                {this.props.company && <Grid item xs={12} sm={6} md={4}>
                    <Typography variant={"h5"}>{this.props.company}</Typography>
                </Grid>}
                {this.props.position && <Grid item xs={12} sm={6} md={4}>
                    <Typography variant={"h6"}>{this.props.position}</Typography>
                </Grid>}
            </Grid>
            <Line/>
            <Grid item xs={12} sm={10} md={8}>
                {this.props.children}
            </Grid>
        </div>
    }
}

export {ExperienceSection}