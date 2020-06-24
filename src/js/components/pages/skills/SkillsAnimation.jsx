import React, {Component} from "react"
import {animationDuration, positionBetweenMatrix, positionBetweenPoints, trianglePointsDown, trianglePointsUp, triangleSize} from "./Triangle";
import {multV2, plusV2} from "../../../V2";

class SkillsAnimation extends Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()

        this.animationDuration = 0

        this.triangles = [{
            x:0,
            y:0
        }]
        this.triangleAnimations = {
            0:{
                x:0,
                y:0,
                currentDuration:0,
                point:0
            },
            1:{
                x:0,
                y:0,
                currentDuration:0,
                point:2
            }
        }

        this.animationIdCounter = 100

        this.draw = this.draw.bind(this)
        this.getFrameTime = this.getFrameTime.bind(this)
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

    getFrameTime() {
        const currentMil = new Date().getTime()
        if(this.lastFrameTime === undefined) this.lastFrameTime = currentMil
        const time = currentMil - this.lastFrameTime
        this.lastFrameTime = currentMil
        return time;
    }

    draw() {
        const frameTime = this.getFrameTime()
        this.animationDuration += frameTime
        const canvas = this.canvasRef.current
        const ctx = this.canvasRef.current.getContext("2d")

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        let fraction = this.animationDuration / 1000

        if(fraction > 1) fraction = 1

        const animationsToDelete = []

        const c = "rgb(30,30,30)"

        this.triangles.forEach(triangle => {
            this.drawTriangle(ctx,c,[triangle.x,triangle.y],0,0)
        })

        for(const [id,triangleAnimation] of Object.entries(this.triangleAnimations) )  {
            const newDuration = triangleAnimation.currentDuration + frameTime
            this.drawTriangle(
                ctx,
                c,
                [triangleAnimation.x, triangleAnimation.y],
                triangleAnimation.point,
                newDuration / animationDuration
            )
            triangleAnimation.currentDuration = newDuration

            if(newDuration >= animationDuration) {
                animationsToDelete.push(id)
                let newX = triangleAnimation.x
                let newY = triangleAnimation.y
                if(triangleAnimation.point === 1) newX -= 1
                if(triangleAnimation.point === 0) newX += 1
                if(triangleAnimation.point === 2 ) newY += 1
                this.triangles.push({x:newX,y:newY})
                if(triangleAnimation.x < 20) {
                    this.animationIdCounter += 1
                    const newObj = {...triangleAnimation}
                    newObj.x = newX
                    newObj.y = newY
                    newObj.currentDuration = 0
                    newObj.point = 0
                    this.triangleAnimations[this.animationIdCounter] = newObj
                }
            }
        }


        animationsToDelete.forEach(id => delete this.triangleAnimations[id])

        //console.log(animationsToDelete)



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