import React, {Component} from "react"
import {Line} from "./Line";

const lineColor = "#FFF"
const lineWidth = 2

class LineAnimation extends Component {
    constructor(props) {
        super(props)
        this.lines = [new Line(105)]
        this.canvasRef = React.createRef()

        this.getFrameTime = this.getFrameTime.bind(this)
        this.draw = this.draw.bind(this)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw)
    }

    drawLine(ctx,vec) {
        ctx.beginPath()
        ctx.moveTo(...vec[0])
        ctx.lineTo(...vec[1])

        ctx.strokeStyle = lineColor
        ctx.lineWidth = lineWidth
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
        const ctx = this.canvasRef.current.getContext("2d")

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        const frameTime = this.getFrameTime()

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
                       width={200}
                       height={200}
        />
    }
}

export {LineAnimation}