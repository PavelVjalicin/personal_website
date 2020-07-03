import React, {Component} from "react"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

export default class Theme extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        const theme = createMuiTheme({
            palette: {
                type: 'dark'
            }
        })

        return <ThemeProvider theme={theme}>
            {this.props.children}
            <CssBaseline/>
        </ThemeProvider>
    }
}