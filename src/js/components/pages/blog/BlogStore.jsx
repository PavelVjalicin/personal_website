let blogs = null
export const getBlogs = async () => { 
     if(!blogs) {
        blogs = {
            order:["id"],
            data: { id : {
                id: "id",
                title: "Title",
                content: "Hello",
                date: '2022-03-23',
                tags: [1]
            } }
        }
    }
    return blogs
}

const getTags = {
    1: "Technology"
}