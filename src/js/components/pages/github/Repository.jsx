import React, {Component} from "react"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Anchor} from "../../Anchor";
import {ViewReadme} from "./ViewReadme";

class Repository extends Component {
    constructor(props) {
        super(props)
        this.topRef = React.createRef()
    }

    render() {
        const repo = this.props.repo

        const S = (props) => <span style={{paddingRight:20,...props.style}}>{props.children}</span>

        return <>
            <Box style={{
                marginTop:20,
                paddingTop:10,
                paddingBottom:5,
                border:0,
                borderTop:1,
                borderColor:"#e6d38f",
                borderStyle:"solid"}}>
                <div ref={this.topRef}><Anchor href={repo.html_url}>{repo.full_name}</Anchor></div>
                <div><Typography color={"textSecondary"}>{repo.description}</Typography></div>
                <ViewReadme repo={repo.name} topRef={this.topRef}/>
                <div style={{paddingTop:10}}>
                    <S>
                        <span style={{color:"#8f9ce6"}} >{repo.language}</span>
                    </S>
                    <S>
                        <span>{repo.license.name === "Other" ? "Other License" :repo.license.name}</span>
                    </S>
                    <S>
                        <span>Last Updated: {new Date(repo.updated_at).toLocaleString()}</span>
                    </S>
                </div>
            </Box>
        </>
    }
}

export {Repository}