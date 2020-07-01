import React, {Component} from "react"
import {Repository} from "./Repository";
import {fetch} from "whatwg-fetch"

class GitRepositories extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repoInfo:[]
        }

        this.mounted = false
    }

    componentDidMount() {
        this.mounted = true
        fetch("/api/repo")
            .then((resp) => resp.json())
            .then(json => {
                    if (this.mounted === true) {
                        this.setState({repoInfo: json})
                    }
                }
            )
    }

    componentWillUnmount() {
        this.mounted = false
    }


    render() {
        return this.state.repoInfo.length === 0 ? <div>Fetching data from GitHub...</div> :
            this.state.repoInfo.map(repo => <Repository key={repo.id} repo={repo}/>)
    }
}

export {GitRepositories}