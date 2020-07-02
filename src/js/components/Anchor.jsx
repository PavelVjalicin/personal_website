import React, {Component} from "react"
import OpenInNew from "@material-ui/icons/OpenInNew";
import Link from "@material-ui/core/Link";

class Anchor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <Link rel={"noreferrer"} color={"secondary"} target={"_blank"} href={this.props.href}>{this.props.children} <OpenInNew style={{fontSize:15}}/></Link>
    }
}

export {Anchor}