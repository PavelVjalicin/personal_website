import React, {Component} from "react"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class TopNav extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this)
        this.hrefs = this.props.links.map(x => x[0])
        this.state = {
            activeTab:this.setActiveTab(window.location.pathname)
        }

    }

    setActiveTab(activeTab) {
        return this.hrefs.includes(activeTab) ? activeTab : false
    }

    handleChange(e,activeTab) {
        this.setState({
            activeTab:this.setActiveTab(activeTab)
        })
    }

    render() {
        return <AppBar color={'default'} position={"fixed"}>
            <Toolbar>
                <Tabs value={this.state.activeTab} onChange={this.handleChange}>
                    {this.props.links.map(link =>
                        <Tab key={link[0]}
                             label={link[1]}
                             component={Link}
                             value={link[0]}
                             to={link[0]}/>
                    )}
                </Tabs>
            </Toolbar>
        </AppBar>
    }
}

export {TopNav}