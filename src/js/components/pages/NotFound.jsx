import React, {Component} from "react"
import Typography from "@mui/material/Typography";

class NotFound extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <Typography variant={"h6"}>Page Not Found</Typography>
        </>
    }
}

export {NotFound}