import React, {Component} from "react"
import {Square} from "./Square";
//import css from "./SquareManager.module.scss"
class SquareManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const ar = []
        for(let i=0; i < 50; i++) {
            ar.push(React.createElement(Square,{key:i}))
        }

        return <div /*className={css.main}*/>
            {ar}
        </div>
    }
}

export {SquareManager}
