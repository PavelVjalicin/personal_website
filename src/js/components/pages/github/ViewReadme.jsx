import React, {Component} from "react"
import Button from "@material-ui/core/Button";
import {fetch} from "whatwg-fetch"
import Box from "@material-ui/core/Box";
import ReactMarkdown from "react-markdown";

class ViewReadme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            data:null,
            noReadMe:false
        }

        this.openClick = this.openClick.bind(this)
        this.closeClick = this.closeClick.bind(this)
    }

    openClick() {
        if(this.state.data === null) {
            fetch(`/api/readme/${this.props.repo}`)
                .then(resp => resp.text())
                .then(text => {
                    const textNoFirstWord = text.split(" ")
                    textNoFirstWord.shift()
                    const noReadMe = textNoFirstWord.join(" ") === "does not have a README.md file."
                    this.setState({open: true, data: text,noReadMe:noReadMe})
                })
        } else {
            this.setState({open:true})
        }
    }

    closeClick() {
        this.setState({open:false})
    }



    render() {
        return <div style={{paddingTop:10}}>
            {!this.state.open ? <Button variant={"contained"} color={"primary"} onClick={this.openClick}>View README.md</Button> :
                <Box>
                    <ReactMarkdown source={this.state.data}/>
                    {!this.state.noReadMe ?<Button variant={"outlined"} onClick={this.closeClick}>Close ReadMe</Button> : null}
                </Box>
            }
        </div>
    }
}

export {ViewReadme}