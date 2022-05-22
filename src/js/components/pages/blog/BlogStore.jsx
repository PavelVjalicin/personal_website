let blogs = null
export const getBlogs = async () => {
    if (!blogs) blogs = await fetch('/api/blog').then(resp => {
        return resp.json()
    })
    return blogs
}