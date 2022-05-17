import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export const Markdown = ({data}) => <ReactMarkdown remarkPlugins={[gfm]} children={data} linkTarget="_blank"
                                       components={{a:(props) =>  <a href={props.href} style={{color:'#f50057'}} target="_blank">{props.children}</a>}}/>