import React, {Component} from "react"
import css from "./Square.module.scss"
import {minusV2, plusV2} from "../../../V2";
//V2 = Vector2
const spawnBoxV2 = [300,150]
const spawnBoxOffsetV2 = [0,-10]

const isUpper = (positionV2) => positionV2[1] < (spawnBoxV2[1] / spawnBoxV2[0]) * positionV2[0]


//Mirrors position vector if under rectangle diagonal cross-section.
const invert = (positionV2) => {
    if(isUpper(positionV2)) {
        return positionV2
    } else {
        return minusV2(spawnBoxV2,positionV2)
    }
}

//console.log(invert([0,100]))
//console.log(invert([250,0]))

const random = (from,to) => Math.random()*(to-from) + from

const randomV2 = (V2) => {
    return [random(0,V2[0]),random(0,V2[1])]
}


const genPositionV2 = () => {

    const randomPosition = randomV2(spawnBoxV2)
    //console.log("Random position:")
    //console.log(randomPosition)
    const invertedPosition = invert(randomPosition)
    //console.log("Inverted position:")
    //console.log(invertedPosition)
    let finalPosition = plusV2(
        invertedPosition,
        spawnBoxOffsetV2
    )


    //inverting x axis
    finalPosition[0] = spawnBoxV2[0] - finalPosition[0]

    return finalPosition
}

class Square extends Component {
    constructor(props) {
        super(props)
        this.state = {animationStarted:false}

        this.size = random(8,20)
        this.positionV2 = genPositionV2()
        this.rotationStart = random(360,180)
        this.rotationEnd = random(180,0)
        this.transitionSpeed = random(1,5)
        this.opacityStart = 0
        this.opacityEnd = 1
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({animationStarted:true})
            clearTimeout(this.timer)
        },random(0,3000))
    }

    componentWillUnmount() {
        if(this.timer) clearTimeout(this.timer)
    }

    render() {
        const pos = this.state.animationStarted ? this.positionV2 : [0,this.positionV2[1]]
        const rotation = this.state.animationStarted ? this.rotationEnd : this.rotationStart
        const opacity = this.state.animationStarted ? this.opacityEnd : this.opacityStart
        return <div className={css.square} style={{
            height: this.size,
            width:this.size,
            right:pos[0],
            top:pos[1],
            transform: `rotate( ${rotation}deg )`,
            transition: this.transitionSpeed+"s",
            opacity:opacity
        }}>

        </div>
    }
}

export {Square}