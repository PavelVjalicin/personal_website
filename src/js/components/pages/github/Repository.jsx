import React, {Component} from "react"
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {Anchor} from "../../Anchor";
import {ViewReadme} from "./ViewReadme";
import css from "./Repository.module.scss"
class Repository extends Component {
    constructor(props) {
        super(props)

        this.state = {small:window.innerWidth < 600}

        this.topRef = React.createRef()
        this.manageSize = this.manageSize.bind(this)
    }

    manageSize() {
        if(window.innerWidth < 500) {
            if(this.state.small !== true) this.setState({small: true})
        }
        else if(window.innerWidth > 550) {
            if(this.state.small !== false) this.setState({small: false})
        }
    }

    componentDidMount() {
        window.addEventListener("resize",this.manageSize)
    }

    componentWillUnmount() {
        window.removeEventListener("resize",this.manageSize)
    }

    render() {
        const repo = this.props.repo

        const S = (props) => <span style={{paddingRight:20,...props.style}}>{props.children}</span>

        const lastUpdatedComp = <span>Last Updated: {new Date(repo.updated_at).toLocaleString()}</span>

        const lastUpdated = !this.state.small ? <S>{lastUpdatedComp}</S> : <div style={{paddingTop:5}}>{lastUpdatedComp}</div>

        return <>
            <Box className={css.box}>
                <div ref={this.topRef}><Anchor href={repo.html_url}>{repo.full_name}</Anchor></div>
                <div><Typography color={"textSecondary"}>{repo.description}</Typography></div>
                <ViewReadme repo={repo.name} topRef={this.topRef}/>
                <div style={{paddingTop:10}}>
                    <S>
                        <span style={{color:"#8f9ce6"}} >{repo.language}</span>
                    </S>
                    <S>
                        <span>{repo.license.name === "Other" ? "Other License" :repo.license.name}</span>
                    </S>
                    {lastUpdated}
                </div>
            </Box>
        </>
    }
}

export {Repository}