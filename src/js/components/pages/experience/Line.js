import {rotateV2} from "../../../V2";

const animationDuration = 1000
const maxLineNumber = 4
const lineSpacing = 10
const maxLineLength = 200
const minLineLength = 20

const getLineNum = () => between(1,maxLineNumber)
//10, 100
const between = (a,b) => Math.round((Math.random() * (b - a)) + a)

const getInitialLineVectors = () => {
    const num = getLineNum()
    let arr = []

    const totalSpacing = (num - 1) * lineSpacing

    let maxLength = maxLineLength - totalSpacing

    let startPosition = 0
    for(let i = 0; i < num; i++) {

        const maxLengthWIthReservedMinLength = maxLength + (minLineLength * i) - num * minLineLength

        let length = between(
            minLineLength,
            maxLengthWIthReservedMinLength )

        if(i === num - 1 ) length = maxLength

        let endPosition = startPosition + length

        arr.push([
            [startPosition,0],
            [endPosition,0]
        ])

        maxLength -= length
        startPosition += length + lineSpacing
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