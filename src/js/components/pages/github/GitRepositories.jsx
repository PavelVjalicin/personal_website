import React, {Component} from "react"
import {Repository} from "./Repository";
import {fetch} from "whatwg-fetch"
import Typography from "@material-ui/core/Typography";

class GitRepositories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repoInfo:[],
            pinnedRepos: []
        }

        this.mounted = false
    }

    componentDidMount() {
        this.mounted = true
        fetch("/api/repo")
            .then((resp) => resp.json())
            .then(json => {
                    if (this.mounted === true) {
                        const pinnedRepos = []
                        const repos = []
                        json.forEach(value => {
                            if(this.props.pinnedRepos.includes(value.full_name)) {
                                pinnedRepos.push(value)
                            } else {
                                repos.push(value)
                            }
                        })
                        this.setState({
                            pinnedRepos: pinnedRepos,
                            repoInfo: repos
                        })
                    }
                }
            )
    }

    componentWillUnmount() {
        this.mounted = false
    }


    render() {
        return this.state.repoInfo.length === 0 ? <div>Fetching data from GitHub...</div> :
            <>
                {this.state.pinnedRepos.length !== 0 &&
                <div style={{paddingTop:40,paddingBottom:40}}>
                    <Typography variant={"h5"}>Pinned Repositories</Typography>
                    {this.state.pinnedRepos.map(repo => <Repository key={repo.id} repo={repo}/>)}
                </div>
                }
                <Typography variant={"h5"}>Repositories</Typography>
                {this.state.repoInfo.map(repo => <Repository key={repo.id} repo={repo}/>)}
            </>
    }
}

export {GitRepositories}