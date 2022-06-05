let blogs = null
export const getBlogs = async () => {
    if(window.app?.data?.blogs) {
        return window.app.data.blogs
    }
    if (!blogs) blogs = await fetch('/api/blog').then(resp => {
        return resp.json()
    })
    return blogs
}

export const refreshBlogs = () => blogs = null