import React, {Component} from "react"



class Square extends Component {
    constructor(props) {
        super(props)
    }

    random(from,to) {
        return Math.random()*(to-from) + from
    }

    render() {
        const size = this.random(8,20)
        return <div style={{
            height: size,
            width:size,
            position:"absolute",
            right:this.random(-50,200),
            top:this.random(-25,70),
            backgroundColor:"black",
            borderColor:"white",
            border:1,
            borderStyle:"solid",
            transform: `rotate( ${this.random(0,90)}deg )`,
        }}>

        </div>
    }
}

export {Square}