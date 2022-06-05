import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material";
import { PageTitle } from "../../PageTitle";
import { Markdown } from "../../Markdown";
import { useParams } from "react-router-dom";
import { getBlogs } from "./BlogStore";

export default function BlogPost() {
    const { id } = useParams();
    const [blog, setBlog] = useState(window.app?.data?.blogs.data[id] || null)
    useEffect(() => {
        getBlogs().then(blogs => setBlog(blogs.data[id]))
    })

    return <> {blog ? <>
        <PageTitle>{blog.title}</PageTitle>
        <Markdown data={blog.content} />
        <Typography variant={'overline'}>{new Date(blog.date).toLocaleDateString()}</Typography>
    </> : <Typography>Loading...</Typography>}
    </>
}
