import React, {Component} from "react"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class TopNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <AppBar color={'default'} position={"fixed"}>

            <Toolbar>
                {this.props.links.map(link =>
                    <Button key={link[0]} component={Link} to={link[0]}>{link[1]}</Button>
                )}
            </Toolbar>

        </AppBar>
    }
}

export {TopNav}