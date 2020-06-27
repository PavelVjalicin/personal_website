import React, {Component} from "react"
import AppBar from "@material-ui/core/AppBar";
import {Link} from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from "@material-ui/core/Typography";
class TopNav extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this)
        this.manageSize = this.manageSize.bind(this)

        this.hrefs = this.props.links.map(x => x[0])

        this.state = {
            activeTab:this.setActiveTab(window.location.pathname),
            small: window.innerWidth < 800
        }
    }

    manageSize() {
        if(window.innerWidth < 800) {
            if(this.state.small !== true) this.setState({small: true})
        }
        else if(window.innerWidth > 800) {
            if(this.state.small !== false) this.setState({small: false})
        }
    }

    componentDidMount() {
        window.addEventListener("resize",this.manageSize)
    }

    componentWillUnmount() {
        window.removeEventListener("resize",this.manageSize)
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
            {this.state.small ? <Toolbar>
                    <Grid container
                          alignItems={"center"}
                          justify={"space-between"}>
                        <Typography>Pavel Vjalicin - Personal Website</Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => this.setState({drawer:true})}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={this.state.drawer}
                                anchor={"right"}
                                variant={"temporary"}
                                PaperProps={{style:{width:200}}}
                                onClose={() => this.setState({drawer:false})}>
                            <List>
                                <IconButton onClick={() => this.setState({drawer:false})}>
                                    <ChevronRightIcon />
                                </IconButton>
                                <Divider/>
                                {this.props.links.map(link =>
                                    <React.Fragment key={link[0]}>
                                        <ListItem button
                                                  component={Link}
                                                  to={link[0]}
                                                  onClick={() => this.setState({drawer:false,activeTab:link[0]})}>
                                            <ListItemText primary={link[1]}
                                                          primaryTypographyProps={this.state.activeTab === link[0] ? {color:"secondary"} : {}}/>
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                )}
                            </List>
                        </Drawer>
                    </Grid>
                </Toolbar> :
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
                </Tabs>}
        </AppBar>
    }
}

export {TopNav}