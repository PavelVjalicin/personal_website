import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";
import { PageTitle } from "../../PageTitle";
import { getBlogs } from "./BlogStore";

const cardCharLimit = 200

export default function Blog() {
    const [blogs, setBlogs] = useState(null)

    useEffect(async () => {
        getBlogs().then( setBlogs )
    })

    return <>
        <Helmet>
            <title>Pavel Vjalicin - Blog</title>
            <meta name={"description"} content={"Pavel Vjalicin - Blog"} />
        </Helmet>
        
        <PageTitle>Blog</PageTitle>

        { blogs ? blogs.order.map( (id) => <BlogCard key={id} blog={blogs.data[id]}/>) : <Typography>Loading...</Typography> }
    </>
}

const BlogCard = ({blog}) => {
    return <Card>
        <CardContent>
            <Typography variant="h5">
                {blog.title}
            </Typography>
            <Typography>{blog.content.slice(0,cardCharLimit) + "..."}</Typography>
            <Typography variant={'overline'}>{blog.date}</Typography>
        </CardContent>
        <CardActions >
        <Button component={Link} to={blog.id}>Read More</Button>
        </CardActions>
    </Card>
}


