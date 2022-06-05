import React from "react";
import loadable from '@loadable/component'

const ReactMarkdown = loadable(() => import('react-markdown'), { ssr: false })
const gfm = loadable(() => import('remark-gfm'), { ssr: false })

export const Markdown = ({data}) => <ReactMarkdown remarkPlugins={[gfm]} children={data} linkTarget="_blank"
                                       components={{a:(props) =>  <a href={props.href} style={{color:'#f50057'}} target="_blank">{props.children}</a>}}/>