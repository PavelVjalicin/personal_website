import {multV2, plusV2} from "../../../V2";

const triangleSize = 30
const lineSize = 1.5
const height = triangleSize * Math.cos(Math.PI / 6);
const animationDuration = 300

function trianglePoints(isUp) {
    const directionalHeight = isUp ? -height : height

    const directionLineSize = isUp ? -lineSize : lineSize

    return [
            [0,0],
            [triangleSize,0],
            [triangleSize/2,directionalHeight]
    ]
}

function positionBetweenMatrix(matrix1,matrix2,fraction) {
    return matrix1.map( (m1Point,m1Index) =>
        positionBetweenPoints(m1Point,matrix2[m1Index],fraction)
    )
}

function positionBetweenPoints(pos1V2,pos2V2,fraction) {
    return plusV2(
        multV2(pos1V2,1-fraction),
        multV2(pos2V2,fraction)
    )
}



const trianglePointsUp = () => trianglePoints(true)
const trianglePointsDown = () => trianglePoints(false)

export {trianglePointsUp,trianglePointsDown,positionBetweenPoints,triangleSize,positionBetweenMatrix,animationDuration}