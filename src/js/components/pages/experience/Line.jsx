import {rotateV2} from "../../../V2";

const animationDuration = 500
const maxLineNumber = 3
const lineColor = "#FFF"
const lineWidth = 1
const lineSpacing = 5
const maxLineLength = 100
const minLineLength = 20

const getLineNum = () => between(1,maxLineNumber)
//10, 100
const between = (a,b) => Math.round(Math.random() * (b - a) + 1)

const getInitialLineVectors = () => {
    const num = getLineNum()
    let arr = []

    const totalSpacing = (num - 1) * lineSpacing

    let startPosition = 0

    for(let i = 0; i < num; i++) {
        const linesLeft = num - i + 1
        const maxLength = maxLineLength - totalSpacing - linesLeft * minLineLength
        const endPosition = between(minLineLength,maxLength)
        arr.push([
            [startPosition,0],
            [endPosition,0]
        ])
        startPosition += endPosition + lineSpacing
    }
    return arr
}

class Line {
    constructor(maxRotation) {
        this.animationTime = 0;
        this.lines = getInitialLineVectors()
        this.maxRotation = maxRotation

        this.animationFinished = this.animationFinished.bind(this)
        this.getMatrixAfter = this.getMatrixAfter.bind(this)
        this.getAnimationFraction = this.getAnimationFraction.bind(this)
    }

    animationFinished() {
        return this.animationTime > animationDuration
    }

    getAnimationFraction() {
        return this.animationTime / animationDuration
    }

    getMatrixAfter(duration) {
        this.animationTime += duration
        if(this.animationFinished()) {
            this.animationTime = animationDuration
        }

        return this.lines.map(line =>
            line.map(vec =>
                rotateV2(
                    vec,
                    this.getAnimationFraction() * this.maxRotation
                )
            )
        )
    }
}

export {Line}