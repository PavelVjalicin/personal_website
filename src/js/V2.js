const minusV2 = (v1,v2) => [v1[0] - v2[0], v1[1] - v2[1] ]
const plusV2 = (v1,v2) => [v1[0] + v2[0], v1[1] + v2[1] ]
const multV2 = (v1,mult) => v1.map(x => x * mult)
const rotateV2 = (vector,degrees) => {
    const radians = degrees * (Math.PI/180)
    const cos = Math.cos(radians)
    const sin = Math.sin(radians)
    //Multiplying rotation matrix with vector.
    return [vector[0] * cos - vector[1] * sin, vector[0] * sin + vector[1] * cos]
}

export {minusV2,plusV2,multV2}