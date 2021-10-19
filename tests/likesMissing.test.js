const Blog = require('../models/blog.js')

test('if likes is missing, set default value to 0', async () => 
{

    const newBlog = new Blog({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
    })

    expect(newBlog.likes).toBe(0)

},100000)