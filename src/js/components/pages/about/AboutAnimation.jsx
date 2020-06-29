import React, {Component} from "react"
import css from "./AboutAnimation.module.scss"

class AboutAnimation extends Component {
    constructor(props) {
        super(props)

        this.width = 250
        this.height = 200
        this.spawnDelay = 150
        this.maxNumOfDots = 50
        this.curNumberOfDots = 0
        this.state = {dots:[]}

        this.spawnDot = this.spawnDot.bind(this)
        this.dot = this.dot.bind(this)
    }

    componentDidMount() {
        this.timer = setInterval(this.spawnDot,this.spawnDelay)
    }

    componentWillUnmount() {
        if(this.timer === undefined)  clearTimeout(this.timer)
    }

    spawnDot() {
        if(this.curNumberOfDots < this.maxNumOfDots) {
            const dots = [...this.state.dots]
            dots.push(
                this.dot()
            )

            this.setState({dots: dots})
        } else {
            clearInterval(this.timer)
        }
    }

    dot() {
        this.curNumberOfDots += 1

        const opacity = Math.random() * 0.5 + 0.5

        const angle = Math.random() * (Math.PI / 2)

        const maxDistance = 200

        const distance = Math.random() * maxDistance

        const size = Math.random() * (maxDistance - distance) / 5   + 20

        const top = distance * Math.cos(angle) - 20

        const right = distance * Math.sin(angle) - 20

        const style = {
            height: size,
            width: size,
            opacity: opacity,
            top:top,
            right:right
        }

        return <div key={this.curNumberOfDots} className={css.dot} style={style}/>
    }

    render() {
        return <div className={css.main} style={{height:this.height,width:this.width}}>
            {this.state.dots}
        </div>
    }
}

export {AboutAnimation}