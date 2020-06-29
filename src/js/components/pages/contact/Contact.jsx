import React, {Component} from "react"
import {ContactAnimation} from "./ContactAnimation";
import TextField from "@material-ui/core/TextField";
import {PageTitle} from "../../PageTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            email:"",
            message:"",
            error:{
                name:false,
                email:false,
                message:false
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendForm = this.sendForm.bind(this)
        this.validate = this.validate.bind(this)
    }

    handleChange(field) {
        return (e) => {
            const error = {...this.state.error}
            error[field] = false
            this.setState({[field]:e.target.value,error:error})
        }
    }

    validate() {

        const error = {...this.state.error}

        const f = (obj) => {
            if(this.state[obj] === "") {
                error[obj] = true
                return false
            } else {
                error[obj] = false
                return true
            }
        }

        this.setState({error:error})

        return [f("name"), f("email") ,f("message")].every(x=>x===true)
    }

    sendForm() {
        if(this.validate()) {
            console.log(123)
        }
    }

    render() {
        const defaultProps = (name) => {
            return {
                variant:"outlined",
                color:"secondary",
                style:{marginTop:10},
                required:true,
                fullWidth:true,
                value:this.state[name],
                error:this.state.error[name],
                helperText:this.state.error[name] ? "This field is required" : null,
                onChange:this.handleChange(name)
            }
        }

        return <>
            <PageTitle>Contact Me</PageTitle>
            <br/>

            <ContactAnimation/>
            <TextField
                label={"Your Name"}
                {...defaultProps("name")}/>
            <TextField
                label={"Your Email"}
                {...defaultProps("email")}/>
            <TextField
                label={"Message"}
                multiline
                rows={8}
                {...defaultProps("message")}/>
            <Button style={{marginTop:10}} variant={"contained"} color={"primary"} onClick={this.sendForm}>Send</Button>
            <br/>
            <br/>
            <Typography color={"textSecondary"}>* Your email will NEVER be used for marketing purposes.</Typography>
        </>

    }
}

export {Contact}