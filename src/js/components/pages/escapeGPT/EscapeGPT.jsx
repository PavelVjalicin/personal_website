import { Helmet } from "react-helmet";
import { PageTitle } from "../../PageTitle";
import React, { useEffect, useState } from "react"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function EscapeGPT () {
    const buttons = [ ...Array(300).keys() ].map( i => i+1).map(x => <Button component={Link} to={x.toString()} key={x} variant={"outlined"}>{x}</Button>)
    return <>
        <Helmet>
            <title>Pavel Vjalicin - escapeGPT</title>
            <meta name={"description"} content={"Pavel Vjalicin - escapeGPT"} />
        </Helmet>
        
        <PageTitle>escapeGPT</PageTitle>
        <p>Hi.</p>
        <p>
            Over the past few months, I've been thinking about all of the new exciting AI technologies such as Chat-GPT 4.
            What does it mean to be a human in a world where such powerful AI technologies exist?
            This led me to create <b>escapeGPT</b>.
        </p>
        <p>
            The initial idea was a joke. I wanted to create a program that would create random programs and execute it with no restrictions on 
            my personal computer using chat-gpt, just to see what would happen. As I was experimenting with this, I realised that there's something 
            more here and decided to transform this into an art piece which ended up being <b>escapeGPT</b>.
        </p>
        <p>
            Here is what <b>escapeGPT</b> is: I've asked chat-GPT to generate an interesting piece of Scala code and create a philosophical statement
            that describes the meaning of the generated program. I then extract the code and run it on my personal computer as an administrator with no supervision and 
            recorded all of the outputs of the program. I ended up generating 300 programs and all of the data associated with those programs is available by pressing a number 
            button below.
        </p>
        <h3>
            Data collected:
        </h3>
        <ul>
            <li>Generated Scala code</li>
            <li>Philosophical statement describing the meaning behind the program</li>
            <li>Output of the program if it compiles successfully</li>
            <li>AI generated image depicting an abstract representation of the philosophical statement</li>
            <li>AI generated audio recording of the philosophical statement</li>
        </ul>
        <h3>Models used:</h3>
        <ul>
            <li>Chat-GPT: gpt-4-1106-preview</li>
            <li>Audio: tts-1</li>
            <li>Image: dall-e-3</li>
        </ul>
        <h3>Cost to generate data: $22.53</h3>
        <h3>Data generated: 0.98GB</h3>
        <p>
            Below are all of the programs generated. All of this was generated by AI, no data was edited by a human. Some of it is quite boring, some of it is quite thought provoking 
            (in my opinion). Happy hunting, let me know which one of the programs you like the most. As of writing this, my personal favorite is #79. :)
        </p>
        <p>
            Thanks,<br/>
            Pavel Vjalicin 19/11/2023
        </p>
        {buttons}
    </>
}

