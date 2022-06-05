import { authenticated, isAdmin } from "./authentication"
import fs from 'fs'


let blogStore = null
const blogsFile = "./data/blogs.json"

export const getBlogs = () => {
    if(!blogStore) {
        if(fs.existsSync(blogsFile)) {
            const blogs = JSON.parse(fs.readFileSync(blogsFile))
            blogStore = blogs
        } else {
            blogStore = { data: {}, meta: {blogsOrdered: [] } }
            fs.writeFileSync(blogsFile, JSON.stringify(blogStore))
        }
    }
    return blogStore
}

export const getFilteredBlogs = () => {
    const blogs = getBlogs()
    const {filteredBlogs, filteredOutBlogIds} = Object.values(blogs.data).reduce( (acc, blog) => {
        if(!blog.publish) {
            acc.filteredOutBlogIds.push(blog.id)
            return acc
        } else {
            acc.filteredBlogs[blog.id] = blog
            return acc
        }
    }, {
        filteredBlogs: {},
        filteredOutBlogIds: []
    })
    return {
        data: filteredBlogs,
        meta: {
            blogsOrdered: blogs.meta.blogsOrdered.filter(x => !filteredOutBlogIds.includes(x) )
        }
    }
}

const setBlogs = (blogs) => {
    fs.writeFileSync(blogsFile, JSON.stringify(blogs))
    blogStore = blogs 
}

export const retrieveBlogsHandler = (req,h) => {
    if(isAdmin(req)) {
        return h.response(getBlogs())
    } else {    
        return h.response(getFilteredBlogs())
    }
}

export const createBlogHandler = authenticated((req,h) => {
    try {
        const { title,content,publish } = req.payload
        const id = title.replace(" ", "_").toLowerCase()
        const blogs = getBlogs()
        if(blogs.meta.blogsOrdered.includes(id)) return h.response("Blog id already exists").code(400)
        const curDate = new Date();
        const newBlog = {
            id: id,
            title: title,
            content:content,
            date: curDate,
            publish: publish
        }
        blogs.data[id] = newBlog
        blogs.meta.blogsOrdered.unshift(id)
        setBlogs(blogs)
        return h.response("").code(201)
    } catch (e) {console.log(e)}
})

export const updateBlogHandler = authenticated((req,h) => {
    const id = req.params.id
    const { title,content, publish } = req.payload
    const blogs = getBlogs()
    const updatedBlog = {
        ...blogs.data[id],
        title: title,
        content: content,
        publish: publish
    }
    console.log()
    blogs.data[id] = updatedBlog
    setBlogs(blogs)
    return h.response("").code(201)
})

export const deleteBlogHandler = authenticated((req,h) => {
    const id = req.params.id
    const blogs = getBlogs()
    delete blogs.data[id]
})
