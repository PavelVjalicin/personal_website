import React, {Component} from "react"
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';
//import css from "./StarRating.module.scss"
import Grid from "@material-ui/core/Grid";

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

        return <div /*className={css.box}*/>
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={6} sm={6} /*className={css.grid}*/>
                    <span /*className={css.text}*/>{this.props.children}</span>
                </Grid>
                <Grid item xs={6} sm={6} /*className={css.starsContainer}*/>
                    <div /*className={css.stars}*/>
                        {stars.map((x,i) => x({key:i,color:"secondary"}))}
                    </div>
                </Grid>
            </Grid>
        </div>
    }
}

export {StarRating}
