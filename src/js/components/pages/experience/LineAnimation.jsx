import React, {Component} from "react"
import {Line} from "./Line";

const lineColor = "#000"
const lineWidth = 2

class LineAnimation extends Component {
    constructor(props) {
        super(props)
        this.lines = []
        this.currentLineNum = 0
        this.curAnim = 0
        this.animDelay = 500
        this.maxLineNum = 15
        this.maxAngle = 105
        this.canvasRef = React.createRef()

        this.getFrameTime = this.getFrameTime.bind(this)
        this.draw = this.draw.bind(this)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw)
    }

    drawLine(ctx,vec) {
        ctx.beginPath()
        const vf = (v) => [-v[0]+250,v[1]]
        ctx.moveTo(...vf(vec[0]))
        ctx.lineTo(...vf(vec[1]))
        ctx.stroke()
    }

    getFrameTime() {
        const currentMil = new Date().getTime()
        if(this.lastFrameTime === undefined) this.lastFrameTime = currentMil
        const time = currentMil - this.lastFrameTime
        this.lastFrameTime = currentMil
        return time;
    }

    draw() {
        const canvas = this.canvasRef.current
        if(canvas === null) return
        const ctx = canvas.getContext("2d")

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
        const frameTime = this.getFrameTime()

        this.curAnim += frameTime
        if(this.curAnim > this.animDelay) {
            if(this.currentLineNum <= this.maxLineNum) {
                this.animDelay *= .9
                this.curAnim = 0
                this.currentLineNum += 1
                const angle =  ( 1 - (this.currentLineNum / (this.maxLineNum + 1)) ) * this.maxAngle
                this.lines.push(new Line(angle))
            }
        }

        const vectors = this.lines.map( line => line.getMatrixAfter(frameTime))

        vectors.forEach(lines =>
            lines.forEach(line =>
                this.drawLine(ctx, line)
            )
        )

        window.requestAnimationFrame(this.draw)
    }

    render() {
        return <canvas ref={this.canvasRef}
                       width={270}
                       height={250}
                       style={{
                           position:"absolute",
                           top:0,
                           right:0,
                           zIndex:-1
                       }}
        />
    }
}

export {LineAnimation}
