import React, {Component} from "react"
import {AboutAnimation} from "./AboutAnimation";

export default class About extends Component {
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