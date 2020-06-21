import React, {Component} from "react"
import {positionBetweenPoints, trianglePointsDown, trianglePointsUp, triangleSize} from "./Triangle";
import {multV2, plusV2} from "../../../V2";

class SkillsAnimation extends Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()

        this.animationDuration = 0

        this.draw = this.draw.bind(this)
        this.getTime = this.getTime.bind(this)
    }

    fillTriangle(ctx,fillStyle,xOffset,yOffset,points) {
        ctx.beginPath();
        ctx.moveTo(xOffset+points[0][0], yOffset+points[0][1]);
        ctx.lineTo(xOffset +points[1][0], yOffset+points[1][1]);
        ctx.lineTo(xOffset +points[2][0],yOffset+points[2][1]);
        ctx.closePath();

        ctx.fillStyle = fillStyle;
        ctx.fill();

    }

    drawTriangle(ctx,color,positionV2,point,fraction) {

        const height = triangleSize * Math.cos(Math.PI / 6);

        const spacing = 2

        const isEvenRow = positionV2[1] % 2 === 0

        const isUp = positionV2[0] % 2 != isEvenRow

        const renderY = isUp ? positionV2[1] : positionV2[1] - 1

        let xOffset = 100 + (triangleSize / 2 + spacing ) * positionV2[0];
        let yOffset = 300 + (height)  * renderY + spacing * positionV2[1];

        const isUpScalar = isUp ? 1 : -1

        const trianglePosition = isUp ? trianglePointsUp() :  trianglePointsDown()

        if(point === 2)
            trianglePosition["outer"][point] = positionBetweenPoints(
                trianglePointsUp()["outer"][point],
                trianglePointsDown()["outer"][point],
                fraction)
        else if(point === 1)
            trianglePosition["outer"][point] = positionBetweenPoints(
                trianglePointsUp()["outer"][point],
                plusV2(trianglePointsUp()["outer"][1],[-triangleSize * 1.5,-height]),
                fraction
            )
        else if(point === 0)
            trianglePosition["outer"][point] = positionBetweenPoints(
                trianglePointsUp()["outer"][point],
                plusV2(trianglePointsUp()["outer"][1],[triangleSize * 0.5 ,-height*isUpScalar]),
                fraction
            )

        this.fillTriangle(ctx,"#000",xOffset,yOffset,trianglePosition["outer"])
        this.fillTriangle(ctx,color,xOffset,yOffset,trianglePosition["inner"])
    }

    getTime() {
        const currentMil = new Date().getTime()
        if(this.lastFrameTime === undefined) this.lastFrameTime = currentMil
        const time = currentMil - this.lastFrameTime
        this.lastFrameTime = currentMil
        return time;
    }

    draw() {
        this.animationDuration += this.getTime()
        const canvas = this.canvasRef.current
        const ctx = this.canvasRef.current.getContext("2d")

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        let fraction = this.animationDuration / 1000

        if(fraction > 1) fraction = 1

        const c = "rgb(30,30,30)"

        for(let x = 0; x< 50; x ++) {
            for(let y = 0; y <5; y++) {
                this.drawTriangle(ctx,c,[x,y],1,0)
            }
        }
        /*this.drawTriangle(ctx,[1,0])
        this.drawTriangle(ctx,[2,0])
        this.drawTriangle(ctx,[0,1])
        this.drawTriangle(ctx,[1,1])
        this.drawTriangle(ctx,[2,1])
        this.drawTriangle(ctx,[0,2])
        this.drawTriangle(ctx,[1,2])
        this.drawTriangle(ctx,[2,2])*/
        window.requestAnimationFrame(this.draw)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw);
    }

    render() {
        return <canvas ref={this.canvasRef} width={500} height={500}/>
    }
}

export {SkillsAnimation}