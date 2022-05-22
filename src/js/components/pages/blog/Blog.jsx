import { Button, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";
import { PageTitle } from "../../PageTitle";
import { getBlogs } from "./BlogStore";
import DeleteIcon from '@mui/icons-material/Delete';
import { getAdmin } from "../../../adminStore";

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
        <br/>
        <AdminOptions/>
        { blogs ? blogs.meta.blogsOrdered.map( (id) => <BlogCard key={id} blog={blogs.data[id]}/>) : <Typography>Loading...</Typography> }
    </>
}

const BlogCard = ({blog}) => {
    const handleDeleteBlog = () => {
        fetch("/api/blog/" + blog.id, { method:"DELETE" }).then( resp => {
            getBlogs().then(setBlogs)
        })
    }

    const [auth, setAuth] = useState(false)

    useEffect( async () => {
        setAuth(await getAdmin())
    })


    return <><Card>
        <CardContent>
            <Typography variant="h5">
                {blog.title}
            </Typography>
            <Typography>{blog.content.slice(0,cardCharLimit)}</Typography>
            <Typography variant={'overline'}>{blog.date}</Typography>
        </CardContent>
        <CardActions >
        <Button component={Link} to={blog.id}>Read More</Button>
        
        {auth && <Button>Edit Blog</Button>}
        {auth && <IconButton onClick={ handleDeleteBlog }><DeleteIcon/></IconButton>}
        {auth && !blog.publish && <div>NOT PUBLISHED</div>}
        </CardActions>
    </Card><br/></>
}

const AdminOptions = () => {
    const [auth, setAuth] = useState(false)

    useEffect( async () => {
        setAuth(await getAdmin())
    })

    return auth ? <>
        <Button component={Link} to={"editor"}>Add Blog</Button>
    </> : <></>
}


