import React, { useState } from 'react'
import { fetchAPI } from '../../../fetchApi';
import { Button, Grid } from '@mui/material';
import { Markdown } from '../../Markdown';

export default function BlogEditor() {
    const [value, setValue] = useState("");
    const [publish, setPublish] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState(null)

    const handleSaveBlog = () => {
        fetchAPI('/api/blog', 'POST', {
            title: title,
            content: value,
            publish: publish
        }).then(async (resp) => {
            if (resp.ok) setMessage("Saved")
            else setMessage(await resp.text())
        })
    }

    return <>
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
            <input type={'checkbox'} value={publish} onChange={(e) => setPublish(!publish)} />
        </div>

        <Button onClick={handleSaveBlog}>Save Blog</Button>
        {message && <div>{message}</div>}
    </>
}