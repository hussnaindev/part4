const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => 
{
    let sum = 0
    blogs.forEach(blog => sum+=blog.likes) 
    return sum
}

const favoriteBlog = (blogs) =>
{
    let favBlog = {}
    if(blogs.length !== 0)
    {
        let max = blogs[0].likes
        blogs.forEach(blog =>
            {
                if(blog.likes>=max)
                {
                    max = blog.likes
                    favBlog = blog
                }
            })
    }
   
    return favBlog
}


const mostBlogs = (blogs) =>
{

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }

    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = authors.filter(unique)

    const reqFields = []
    uniqueAuthors.forEach(uniqueAuthor => {
        const obj = {
            'author': uniqueAuthor,
            'blogs': 0
        }
        reqFields.push(obj)
    })


    blogs.forEach(blog => {
        reqFields.forEach(reqField => {
            if(reqField.author === blog.author)
            {
                Object.keys(reqField).map( key =>
                {
                    if(key==='blogs')
                    {
                        reqField['blogs']+=1
                    }
                    
                })

            }    
        })
    })

    let max = reqFields[0].blogs
    const obj = {}

    reqFields.forEach(reqField => {
        if(reqField.blogs >= max)
        {
            max = reqField.blogs
            obj['author'] = reqField.author
            obj['blogs'] = reqField.blogs
        }
    })

    return obj
}

const mostLikes = (blogs) =>
{

    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }

    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = authors.filter(unique)

    const reqFields = []
    uniqueAuthors.forEach(uniqueAuthor => {
        const obj = {
            'author': uniqueAuthor,
            'likes': 0
        }
        reqFields.push(obj)
    })


    blogs.forEach(blog => {
        reqFields.forEach(reqField => {
            if(reqField.author === blog.author)
            {
                Object.keys(reqField).map( key =>
                {
                    if(key==='likes')
                    {
                        reqField['likes']+=blog.likes
                    }
                    
                })

            }    
        })
    })

    let max = reqFields[0].likes
    const obj = {}

    reqFields.forEach(reqField => {
        if(reqField.likes >= max)
        {
            max = reqField.likes
            obj['author'] = reqField.author
            obj['likes'] = reqField.likes
        }
    })

    return obj
}


module.exports = {dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes}
