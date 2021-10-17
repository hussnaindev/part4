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

module.exports = {dummy,totalLikes,favoriteBlog}
