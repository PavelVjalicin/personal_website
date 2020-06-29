import React, {Component} from "react"
import {AboutAnimation} from "./AboutAnimation";

class About extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <AboutAnimation/>
            <span>Hi my name is Pavel.</span>
        </>
    }
}

export {About}