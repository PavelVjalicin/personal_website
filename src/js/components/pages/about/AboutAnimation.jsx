import React, {Component} from "react"
import css from "./AboutAnimation.module.scss"
import {animationDuration} from "../skills/Triangle";

class AboutAnimation extends Component {
    constructor(props) {
        super(props)

        this.width = 250
        this.height = 200
        this.currentDelay = 0
        this.spawnDelay = 100
        this.maxNumOfDots = 25
        this.curNumberOfDots = 0

        this.canvasRef = React.createRef()

        this.dots = []

        this.getFrameTime = this.getFrameTime.bind(this)
        this.draw = this.draw.bind(this)
        this.dot = this.dot.bind(this)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw)
    }

    getFrameTime() {
        const currentMil = new Date().getTime()
        if(this.lastFrameTime === undefined) this.lastFrameTime = currentMil
        const time = currentMil - this.lastFrameTime
        this.lastFrameTime = currentMil
        return time;
    }

    draw() {
        const frameTime = this.getFrameTime()
        const canvas = this.canvasRef.current
        if(canvas === null) return
        const ctx = canvas.getContext("2d")
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore()
        this.currentDelay += frameTime

        this.dots.forEach(dot => {
            const r = dot.getRadius(frameTime)
            ctx.beginPath()

            ctx.fillStyle = `rgba(0,0,0,${dot.opacity})`
            ctx.strokeStyle = `rgba(0,0,0,${dot.strokeOpacity})`
            ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()
        })

        if(this.curNumberOfDots < this.maxNumOfDots) {
            if (this.spawnDelay < this.currentDelay) {
                this.currentDelay -= this.spawnDelay
                this.dots.push(
                    this.dot()
                )
            }
        }

        if(this.curNumberOfDots === this.maxNumOfDots &&
            this.dots[this.dots.length-1].currentAnimationDuration === animationDuration) {
            return
        }

        window.requestAnimationFrame(this.draw)
    }

    dot() {
        this.curNumberOfDots += 1

        const opacity = Math.random() * 0.5 + 0.1

        const angle = Math.random() * (Math.PI / 2)

        const maxDistance = 180

        const distance = Math.random() * maxDistance

        const size = Math.random() * (maxDistance - distance) / 2   + 30

        const top = distance * Math.cos(angle)

        const right = distance * Math.sin(angle)

        const props = {
            size:size,
            opacity: opacity,
            top:top,
            right:this.width - right
        }

        return new Dot(props)
    }

    render() {
        return <canvas height={this.height} width={this.width+30} ref={this.canvasRef} className={css.main} />
    }
}

const animDuration = 1000

class Dot {
    constructor(props) {
        this.props = props
        this.currentAnimationDuration = 0
        this.r = 0

        this.opacity = Math.random() * 0.3 + 0.3
        this.strokeOpacity = this.opacity + 0.2
        this.x = props.right
        this.y = props.top
        this.r = props.size / 2

        this.getRadius = this.getRadius.bind(this)
    }

    getRadius(t) {
        this.currentAnimationDuration += t
        if(this.currentAnimationDuration > animDuration) this.currentAnimationDuration = animDuration
        const p = this.currentAnimationDuration / animDuration;
        const q =  p*(2-p);

        const r = q * this.r;

        return r
    }

}

export { AboutAnimation }