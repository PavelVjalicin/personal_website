import React, {Component} from "react"
import {Repository} from "./Repository";
import {fetch} from "whatwg-fetch"

class GitRepositories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repoInfo:[]
        }

        fetch("/api/repo")
            .then((resp) => resp.json())
            .then(json => this.setState({repoInfo:json}))
    }

    render() {
        return this.state.repoInfo.length === 0 ? <div>Fetching data from GitHub...</div> :
            this.state.repoInfo.map(repo => <Repository key={repo.id} repo={repo}/>)
    }
}

export {GitRepositories}