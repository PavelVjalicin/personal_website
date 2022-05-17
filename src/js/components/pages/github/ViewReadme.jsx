import React, {Component} from "react"
import Button from "@mui/material/Button";
import {fetch} from "whatwg-fetch"
import Box from "@mui/material/Box";
import scrollIntoView from "scroll-into-view-if-needed";
import { Markdown } from "../../Markdown";

class ViewReadme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            data:null,
            noReadMe:false
        }

        this.myRef = React.createRef()

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
        this.setState({open:false},
            () => {
                const ref = this.props.topRef.current
                scrollIntoView(ref,
                    {
                        scrollMode: 'if-needed',
                        block:'nearest'})
            }
        )
    }



    render() {
        return <div style={{paddingTop:10}} ref={this.myRef} >
            {!this.state.open ? <Button variant={"contained"} color={"primary"} onClick={this.openClick}>View README.md</Button> :
                <Box>
                    <div>
                        <Markdown data={this.state.data}/>
                        {!this.state.noReadMe ?<Button variant={"outlined"} onClick={this.closeClick}>Close ReadMe</Button> : null}
                    </div>
                </Box>
            }
        </div>
    }
}

export {ViewReadme}