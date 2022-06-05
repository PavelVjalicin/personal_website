import React, { useEffect, useState } from 'react'
import { fetchAPI } from '../../../fetchApi';
import { Button, Grid } from '@mui/material';
import { Markdown } from '../../Markdown';
import { getBlogs, refreshBlogs } from './BlogStore';
import { useParams } from "react-router-dom";

export default function BlogEditor() {
    const { id } = useParams();
    const [value, setValue] = useState("");
    const [publish, setPublish] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(id) {
            refreshBlogs()
            getBlogs().then( blogs => {
                const blog = blogs.data[id]
                console.log(blog)
                setValue(blog.content)
                setTitle(blog.title)
                setPublish(blog.publish)
                setLoading(false)
            })
        } 
    }, [])

    const handleSaveBlog = () => {
        
        const url = id ? '/api/blog/' + id : '/api/blog'
        const method = id ? 'PATCH' : 'POST'
        
        fetchAPI(url, method, {
            title: title,
            content: value,
            publish: publish
        }).then(async (resp) => {
            if (resp.ok) setMessage("Saved")
            else setMessage(await resp.text())
        })
    }

    return loading ? <>Loading...</> : <>
        <div>
            Title
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <Grid container>
            <Grid item xs={6}>
                <textarea
                style={{width:'95%', height:500}}
                 value={value} onChange={(e) => setValue(e.target.value)}></textarea>
            </Grid>
            <Grid item xs={6}>
                <Markdown data={value} />
            </Grid>
        </Grid>


        <div>
            Publish:
            <input type={'checkbox'} checked={publish} onChange={(e) => setPublish(!publish)} />
        </div>

        <Button onClick={handleSaveBlog}>Save Blog</Button>
        {message && <div>{message}</div>}
    </>
}