import {rotateV2} from "../../../V2";

const animationDuration = 1000
const maxLineNumber = 3
const lineSpacing = 10
const maxLineLength = 200
const minLineLength = 10

const getLineNum = () => 3//between(1,maxLineNumber)
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
        let endPosition
        if(i === num-1) endPosition = maxLength
        else endPosition = between(minLineLength,maxLength)

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