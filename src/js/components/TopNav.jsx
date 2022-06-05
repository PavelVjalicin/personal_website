import React, {Component} from "react"
import AppBar from "@mui/material/AppBar";
import {Link} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from "@mui/material/Typography";
import NoSsr from "@mui/material/NoSsr";
import Container from "@mui/material/Container";
import { getAdmin } from "../adminStore";

class TopNav extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.setActiveTab = this.setActiveTab.bind(this)
        this.manageSize = this.manageSize.bind(this)

        this.hrefs = this.props.links.map(x => x[0])
        const pathName = window.location?.pathname || ""
        this.state = {
            activeTab:this.setActiveTab(pathName),
            small: window.innerWidth < 800,
            isAdmin: false
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
        getAdmin().then(isAdmin => this.setState({isAdmin:isAdmin}))
    }

    componentWillUnmount() {
        window.removeEventListener("resize",this.manageSize)
    }

    setActiveTab(activeTab) {
        if(activeTab === "/" || activeTab === "") activeTab = "/"
        return this.hrefs.includes(activeTab) ? activeTab : false
    }

    handleChange(e,activeTab) {
        this.setState({
            activeTab:this.setActiveTab(activeTab)
        })
    }

    render() {
        return <AppBar color={'secondary'} position={"sticky"}>
            {this.state.small ? <Toolbar>
                    <Grid container
                          alignItems={"center"}
                          justifyContent={"space-between"}>
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
                                {this.state.isAdmin && <>
                                        <ListItem button
                                                  component={'a'}
                                                  href={"/logout?redirect="+location.pathname}
                                                  >
                                            <ListItemText primary={'logout'}/>
                                        </ListItem>
                                        <Divider/>
                                    </>}
                            </List>
                        </Drawer>
                    </Grid>
                </Toolbar> :
                <Container style={{
                    borderLeft:5,
                    borderLeftStyle:"solid",
                    borderColor:"#f50057",
                    position:"relative"
                }}>
                <Tabs value={this.state.activeTab}
                      onChange={this.handleChange}
                      scrollButtons="auto"
                      textColor="inherit"
                      indicatorColor="secondary"
                >
                    {this.props.links.map(link =>
                        <Tab key={link[0]}
                             label={link[1]}
                             component={Link}
                             value={link[0]}
                             to={link[0]}/>
                    )}
                    {this.state.isAdmin && <Tab
                             label={"Logout"}
                             component={"a"}
                             href={"/logout?redirect="+location.pathname}/>}
                    
                </Tabs></Container>}
        </AppBar>
    }
}

export default (props => <TopNav {...props}/>)
