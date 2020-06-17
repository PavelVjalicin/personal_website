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
                borderColor:"white",
                borderStyle:"solid"}}>
                <Anchor href={repo.url}>{repo.name}</Anchor>
                <div><Typography>{repo.description}</Typography></div>
                <div style={{paddingTop:10}}>
                    <S>
                        <Typography color={"textPrimary"} component={"span"}>{repo.language}</Typography>
                    </S>
                    <S>
                        <Typography component={"span"}>{repo.license.name}</Typography>
                    </S>
                    <S>
                        <Typography component={"span"}>Last Updated: {new Date(repo.updated_at).toLocaleString()}</Typography>
                    </S>
                </div>
            </Box>
        </>
    }
}

export {Repository}