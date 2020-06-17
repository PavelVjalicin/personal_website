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
            width: 300,
            height: "100px",
            top: "50px",
            overflow: "hidden",
            right: 0,
            position: "absolute"}}>
            {ar}
        </div>
    }
}

export {SquareManager}