import React, {Component} from "react"
import {Square} from "./Square";
class SquareManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const ar = []
        for(let i=0; i < 50; i++) {
            ar.push(React.createElement(Square,{key:i}))
        }

        return <div style={{
            width: "100%",
            height: 500,
            top: 0,
            overflow: "hidden",
            right: 0,
            zIndex:-1,
            position: "absolute"
        }}>
            {ar}
        </div>
    }
}

export {SquareManager}
