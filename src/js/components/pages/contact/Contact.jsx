import React, {Component} from "react"
import {ContactAnimation} from "./ContactAnimation";
import TextField from "@mui/material/TextField";
import {PageTitle} from "../../PageTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";
import {validateEmail} from "../../../validateEmail";

export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: "",
            error: {
                name: false,
                email: false,
                message: false
            },
            isSubmitting: false,
            submitted: false,
            errorMessage: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.sendForm = this.sendForm.bind(this)
        this.validate = this.validate.bind(this)
    }

    handleChange(field) {
        return (e) => {
            const error = {...this.state.error}
            error[field] = false
            this.setState({[field]: e.target.value, error: error})
        }
    }

    validate() {

        const error = {...this.state.error}

        const f = (obj) => {
            if (this.state[obj] === "") {
                error[obj] = "This field is required"
                return false
            } else {
                error[obj] = null
                return true
            }
        }

        const emailValid = () => {
            if (validateEmail(this.state.email)) {
                error.email = null
                return true
            } else {
                error.email = "Email is not valid"
                return false
            }
        }

        this.setState({error: error})

        return [f("name"), emailValid(), f("message")].every(x => x === true)
    }

    sendForm(e) {
        e.preventDefault()
        this.setState({isSubmitting: true, errorMessage: null})
        if (this.validate()) {
            fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: this.state.name, email: this.state.email, message: this.state.message})
            }).then(resp => {
                if (resp.ok) {
                    this.setState({isSubmitting: false, submitted: true})
                } else {
                    throw(resp)
                }
            }).catch(err => {
                err.json()
                    .then(jsError => {
                        this.setState({isSubmitting: false, errorMessage: jsError.error})
                    })
                    .catch(e => this.setState({isSubmitting: false, errorMessage: "Something went wrong. Try again later."}))
            })
        } else {
            this.setState({isSubmitting: false})
        }
    }

    render() {
        const defaultProps = (name) => {
            return {
                id: name,
                variant: "outlined",
                color: "secondary",
                style: {marginTop: 10},
                required: true,
                fullWidth: true,
                value: this.state[name],
                error: this.state.error[name] ? true : false,
                helperText: this.state.error[name] ? this.state.error[name] : null,
                onChange: this.handleChange(name),
                onSubmit: (this.sendForm)

            }
        }

        return <>
            <Helmet>
                <title>Pavel Vjalicin - Contact Me</title>
                <meta name={"description"} content={"Contact Pavel Vjalicin."} />
            </Helmet>
            <PageTitle>Contact Me</PageTitle>
            {!this.state.submitted ? <>
                <br/>
                <ContactAnimation/>
                <form onSubmit={(e) => this.sendForm()}>
                    <TextField
                        label={"Your Name"}
                        {...defaultProps("name")}/>
                    <TextField
                        type={"email"}
                        label={"Your Email"}
                        {...defaultProps("email")}/>
                    <TextField
                        label={"Message"}
                        multiline
                        rows={8}
                        {...defaultProps("message")}/>
                    <Button disabled={this.state.isSubmitting}
                            style={{marginTop: 10}}
                            variant={"contained"}
                            color={"primary"}
                            type={"submit"}
                            onClick={this.sendForm}>Send</Button>
                </form>
                <br/>
                {this.state.errorMessage &&
                <div style={{color: "red"}}>{this.state.errorMessage}</div>
                }
                <br/>
                <Typography color={"textSecondary"}>* Your email will NEVER be used for marketing purposes.</Typography>
            </> : <>
                <Typography>Your message has been sent successfully. You will be contacted at {this.state.email} soon.</Typography>
            </>}
        </>

    }
}
