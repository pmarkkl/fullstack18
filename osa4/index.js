const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const Blog = require('./models/blog')

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :response-time :body'))
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs.map(Blog.Format))
    })
})

app.post('/api/blogs', (req, res) => {
  const { title, author, url, likes } = req.body
  const blog = new Blog({
    title, author, url, likes
  })

  blog
    .save()
    .then(savedBlog => {
      res.status(201).json(Blog.Format(savedBlog))
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})