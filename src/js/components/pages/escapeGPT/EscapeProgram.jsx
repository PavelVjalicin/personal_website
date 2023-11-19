import { Link, useParams } from "react-router-dom";
import { PageTitle } from "../../PageTitle";
import React, {useState} from "react"
import { useEffect } from "react";
import { Button, Grid } from "@mui/material";

export default function EscapeProgram() {
    const { id } = useParams();
    const [statement, setStatement] = useState("Loading statement")
    const [code, setCode] = useState("Loading code")
    const [output, setOutput] = useState("Loading output")
    
    const fetchS3 = (url, erText, f) => {
        fetch(url).then(resp => {
            resp.text().then(text => text.includes("AccessDenied") ? f(erText) : f(text)).catch(f(erText))
        }).catch(f(erText))
    }

    const Pre = (props) => <pre style={{
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        textAlign: "justify"
    }}>{props.children}</pre>

    useEffect(() => {
        window.scrollTo(0, 0)
        setStatement("Loading statement")
        setCode("Loading code")
        setOutput("Loading output")
        fetchS3("https://escape-gpt.s3.eu-west-2.amazonaws.com/output/"+id+"/statement.txt", "Could not retrieve statement", setStatement)
        fetchS3("https://escape-gpt.s3.eu-west-2.amazonaws.com/output/"+id+"/code.scala", "Could not retrieve code", setCode)
        fetchS3("https://escape-gpt.s3.eu-west-2.amazonaws.com/output/"+id+"/output.txt", "Could not retrieve output. Chat-GPT might have generated a code that does not compile.", setOutput)
    }, [id])
    return <>
        <PageTitle>escapeGPT - Program #{id}</PageTitle>
        <br/>
        <Control programId={id}/>
        <audio controls>
            <source src={"https://escape-gpt.s3.eu-west-2.amazonaws.com/output/"+id+"/audio.mp3"} type="audio/mpeg"/>
            Your browser does not support the audio element.
        </audio>
        <h3>Code:</h3>
        <Grid container>
            <Grid item xs={12}>
                <Pre>
                    {code}
                </Pre>
            </Grid>
            <Grid item xs={12}>
                <h3>Output:</h3>
                <Pre>
                    {output}
                </Pre>
                <h3>Philosophical statement:</h3>
                <Pre>{statement}</Pre>
            </Grid>
        </Grid>
        
        
        <img src={"https://escape-gpt.s3.eu-west-2.amazonaws.com/output/"+id+"/image.png"}/>
        <Control programId={id}/>
    </>
}

const Control = ({programId}) => {
    const btns = [ ...Array(5).keys() ].map(i => programId - i + 2).map(id => id > 0 && id < 301 ? <Button variant={"outlined"} key={id} component={Link} to={"../" + id} disabled={id==programId}>{id}</Button> : null).reverse()
    
    return <div style={{marginTop: 20, marginBottom: 20}}>
        <Button variant={"outlined"} component={Link} to={"../"+Math.round(Math.random()*299 + 1)}>Random Program</Button>
        {programId > 1 ? <Button variant={"outlined"} component={Link} to={"../" + (programId * 1 - 1)}>Previous</Button> : null }
        {btns}
        { programId < 300 ? <Button variant={"outlined"} component={Link} to={"../" + (programId * 1 + 1)}>Next</Button> : null }
    </div>
}