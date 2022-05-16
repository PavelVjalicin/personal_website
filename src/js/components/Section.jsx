import React, {Component} from "react"
import Typography from "@mui/material/Typography";

const Section = (props) => <Typography variant={"h5"} style={{paddingTop:20,paddingBottom:10}}>{props.children}</Typography>

export {Section}