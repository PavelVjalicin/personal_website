import React, {Component} from "react"
import OpenInNew from "@mui/icons-material/OpenInNew";
import Link from "@mui/material/Link";

class Anchor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Link rel={"noreferrer"} color={"secondary"} target={"_blank"} href={this.props.href} style={this.props.style}>{this.props.children} <OpenInNew style={{fontSize:15}}/></Link>
    }
}

export {Anchor}