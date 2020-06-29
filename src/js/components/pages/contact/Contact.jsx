import React, {Component} from "react"
import {ContactAnimation} from "./ContactAnimation";

class Contact extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <ContactAnimation/>
        </>
    }
}

export {Contact}