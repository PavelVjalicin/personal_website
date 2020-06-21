const minusV2 = (v1,v2) => [v1[0] - v2[0], v1[1] - v2[1] ]
const plusV2 = (v1,v2) => [v1[0] + v2[0], v1[1] + v2[1] ]
const multV2 = (v1,mult) => v1.map(x => x * mult)

export {minusV2,plusV2,multV2}