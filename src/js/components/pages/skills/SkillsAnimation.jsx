import React, {Component} from "react"
import {positionBetweenMatrix, positionBetweenPoints, trianglePointsDown, trianglePointsUp, triangleSize} from "./Triangle";
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

        ctx.strokeStyle = "#000"
        ctx.lineWidth = 1.5
        ctx.stroke()
    }

    drawTriangle(ctx,color,positionV2,point,fraction) {

        this.i = 0

        this.i += 1

        const height = triangleSize * Math.cos(Math.PI / 6);

        const spacing = 3

        const isEvenRow = positionV2[1] % 2 === 0

        const isUp = positionV2[0] % 2 != isEvenRow

        const renderY = isUp ? positionV2[1] : positionV2[1] - 1

        let xOffset =  (triangleSize / 2 + spacing ) * positionV2[0];
        let yOffset =  height + height  * renderY + spacing * positionV2[1];

        const isUpScalar = isUp ? 1 : -1

        let trianglePosition = isUp ? trianglePointsUp() :  trianglePointsDown()
        const reverseTrianglePosition = !isUp ? trianglePointsUp() :  trianglePointsDown()
        let isRightScalar = -1

        switch (point) {
            case 0:
                isRightScalar = 1
            case 1:
                let revMatrix = reverseTrianglePosition
                const [p0, p1, p2] = [...reverseTrianglePosition]
                if (isRightScalar === -1) revMatrix = [p2, p0, p1]
                else revMatrix = [p1, p2, p0]
                trianglePosition = positionBetweenMatrix(
                    trianglePosition,
                    revMatrix.map(x => plusV2(x, [isRightScalar * (triangleSize * 0.5 + spacing), -height * isUpScalar])),
                    fraction
                )
                break
            case 2:
                trianglePosition = positionBetweenMatrix(
                    trianglePosition,
                    reverseTrianglePosition.map(x => plusV2(x, [0, spacing * isUpScalar])),
                    fraction
                )
                break
        }

        this.fillTriangle(ctx,color,xOffset,yOffset,trianglePosition)
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
        for(let x = 0; x< 5; x ++) {
            for(let y = 0; y <5; y++) {
                this.drawTriangle(ctx,c,[x*7,y*3],0,0)
                this.drawTriangle(ctx,c,[x*7,y*3],0,fraction)
                this.drawTriangle(ctx,c,[x*7,y*3],1,fraction)
                this.drawTriangle(ctx,c,[x*7,y*3],2,fraction)
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