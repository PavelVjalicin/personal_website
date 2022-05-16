import React, {Component} from "react"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import Grid from "@mui/material/Grid";

class StarRating extends Component {
    constructor(props) {
        super(props)
    }

    addStar(ar,number, comp) {
        for(let i = 1; i <= number; i++) {
            ar.push(comp)
        }
    }

    render() {
        const Empty = (props) => <StarBorderIcon {...props} />
        const Half = (props) => <StarHalfIcon {...props} />
        const Full = (props) => <StarIcon {...props} />

        const rating = this.props.rating / 2

        const halfStarNumber = rating % 1 === 0.5 ? 1 : 0

        const fullStarNumber = rating

        const emptyStarNumber = 5 - rating

        let stars = []

        this.addStar(stars,fullStarNumber,Full)

        this.addStar(stars,halfStarNumber,Half)

        this.addStar(stars,emptyStarNumber,Empty)

        return <div style={{
            paddingTop:10,
            paddingBottom:10
        }}>
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={6} sm={6}>
                    <span style={{
                        paddingLeft:10,
                        fontWeight:"bold"
                    }}>{this.props.children}</span>
                </Grid>
                <Grid item xs={6} sm={6} style={{textAlign:"center"}}>
                    <div style={{
                        borderRadius: 20,
                        backgroundColor: "#212121",
                        display: "inline-block",
                        padding: "5px 6px 2px 6px"
                    }}>
                        {stars.map((x,i) => x({key:i,color:"secondary"}))}
                    </div>
                </Grid>
            </Grid>
        </div>
    }
}

export {StarRating}
