const mongoose = require('mongoose')
const app = require('../index.js')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')


const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      }
]

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const passwordHash = 'abc22'
    const user = new User({ username: 'root',name: 'hussnain', passwordHash })
    await user.save()
  })

test('user creating a new blog', async () => 
{
    const foundUser = await User.find({})
    const blog = new Blog({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        user: foundUser[0].id
    })
    const savedBlog = await blog.save()
    foundUser[0].blogs = foundUser[0].blogs.concat(savedBlog.id)
    await foundUser[0].save()
    const allUsers = await User.find({}).populate('blogs')
    expect(allUsers).toContain(savedBlog)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
  })