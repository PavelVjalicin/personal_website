import React, {Component} from "react"
import {TopNav} from "./TopNav";
class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <>
            <TopNav links={[
                ["/about","About me"],
                ["/work","Work Experience"],
                ["/github","GitHub"],
                ["/contact","Contact Me"]
            ]}/>
        </>
    }
}

export {App}