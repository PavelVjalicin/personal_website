import React, {Component} from "react"
import AppBar from "@material-ui/core/AppBar";
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
        if(activeTab === "/" || activeTab === "") activeTab = "/about"
        return this.hrefs.includes(activeTab) ? activeTab : false
    }

    handleChange(e,activeTab) {
        this.setState({
            activeTab:this.setActiveTab(activeTab)
        })
    }

    render() {
        return <AppBar color={'default'} position={"sticky"}>
            <Tabs value={this.state.activeTab}
                  onChange={this.handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
            >
                {this.props.links.map(link =>
                    <Tab key={link[0]}
                         label={link[1]}
                         component={Link}
                         value={link[0]}
                         to={link[0]}/>
                )}
            </Tabs>

        </AppBar>
    }
}

export {TopNav}