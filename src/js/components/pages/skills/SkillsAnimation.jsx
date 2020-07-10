import React, {Component} from "react"
import {animationDuration, positionBetweenMatrix, trianglePointsDown, trianglePointsUp, triangleSize} from "./Triangle";
import {plusV2} from "../../../V2";
//import css from "./SkillsAnimation.module.scss"
class SkillsAnimation extends Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()

        this.animationDuration = 0

        this.gridXSize = 12
        this.gridYSize = 6

        //-1 = No triangle, 1 = Triangle, 0 = Animation in progress
        this.triangleGrid = []

        for(let x=0;x<=this.gridXSize; x++) {
            this.triangleGrid.push(Array(this.gridYSize).fill(-1))
        }


        // Double signifies the probability of triangle fold to that grid location.
        this.triangleGridProbs = []

        for(let x=0;x<=this.gridXSize; x++) {
            this.triangleGridProbs[x] = []
            for(let y=0; y<=this.gridYSize;y++) {
                let probability = 1 - y * 0.13
                this.triangleGridProbs[x][y] = probability
            }
        }

        //this.triangleGridProbs.forEach( (o,x) => console.log(o.map(y => y.toFixed(2))))

        this.triangleAnimations = {
            0:{
                x:0,
                y:0,
                currentDuration:0,
                point:2
            },
            1:{
                x:4,
                y:0,
                currentDuration:0,
                point:2
            },
            2:{
                x:10,
                y:0,
                currentDuration:0,
                point:0
            }
        }

        this.animationIdCounter = 100

        this.draw = this.draw.bind(this)
        this.getFrameTime = this.getFrameTime.bind(this)
        this.addAnimation = this.addAnimation.bind(this)
        this.addAnimations = this.addAnimations.bind(this)
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

    isUpFunc(x,y) {
        const isEvenRow = y % 2 === 0
        return x % 2 != isEvenRow
    }

    drawTriangle(ctx,color,positionV2,point,fraction) {

        const height = triangleSize * Math.cos(Math.PI / 6);

        const spacing = 3

        const isUp = this.isUpFunc(positionV2[0],positionV2[1])

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

    addAnimations(x,y) {
        const isUp = this.isUpFunc(x,y)

        const addAnim =(x1,y1,x2,y2,p) => {

            const xGrid = this.triangleGrid[x1+x2]

            if(xGrid === undefined) return

            if(xGrid[y1+y2] === -1) {
                const prob = this.triangleGridProbs[x1+x2][y1+y2]
                if(Math.random() < prob) {
                    this.addAnimation(x1, y1, p)
                    xGrid[y1+y2] = 0
                }
            }
        }

        addAnim(x,y,-1,0,1)

        addAnim(x,y,1,0,0)

        if(isUp) {
            addAnim(x,y,0,1,2)
        } else {
            addAnim(x,y,0,-1,2)
        }
    }

    addAnimation(x,y,point) {
        this.animationIdCounter += 1
        this.triangleAnimations[this.animationIdCounter] = {
            x:x,
            y:y,
            point:point,
            currentDuration:0
        }
    }



    draw() {
        const frameTime = this.getFrameTime()
        this.animationDuration += frameTime
        const canvas = this.canvasRef.current
        if(canvas === null) return
        const ctx = this.canvasRef.current.getContext("2d")

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        let fraction = this.animationDuration / 1000

        if(fraction > 1) fraction = 1

        const animationsToDelete = []

        const c = "rgb(30,30,30)"

        this.triangleGrid.forEach((objX,x) => {
            objX.forEach((objY,y) => {
                if(this.triangleGrid[x][y] === 1) {
                    this.drawTriangle(ctx, c, [x, y], 0, 0)
                }
            })

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
                if(triangleAnimation.point === 2 ) {
                    if(this.isUpFunc(newX,newY))
                        newY += 1
                    else newY -= 1
                }

                this.triangleGrid[newX][newY] = 1

                this.addAnimations(newX,newY)
            }
        }
        animationsToDelete.forEach(id => delete this.triangleAnimations[id])
        if(Object.entries(this.triangleAnimations).length !== 0)
            window.requestAnimationFrame(this.draw)
    }

    componentDidMount() {
        window.requestAnimationFrame(this.draw);
    }

    render() {
        return <canvas ref={this.canvasRef} width={250} height={200} /*className={css.canvas}*//>
    }
}

export {SkillsAnimation}
