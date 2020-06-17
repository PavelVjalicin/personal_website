import React, {Component} from "react"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Anchor} from "../Anchor";

class Repository extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const repo = this.props.repo
        console.log(repo)

        const S = (props) => <span style={{paddingRight:20,...props.style}}>{props.children}</span>

        return <>
            <Box style={{
                marginTop:10,
                paddingTop:5,
                paddingLeft:5,
                paddingBottom:5,
                borderRadius:5,
                border:1,
                borderColor:"#e6d38f",
                borderStyle:"solid"}}>
                <Anchor href={repo.url}>{repo.name}</Anchor>
                <div><Typography color={"textSecondary"}>{repo.description}</Typography></div>
                <div style={{paddingTop:10}}>
                    <S>
                        <span style={{color:"#8f9ce6"}} >{repo.language}</span>
                    </S>
                    <S>
                        <span>{repo.license.name}</span>
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