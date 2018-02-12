const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs.map(Blog.Format))
    })
})

blogRouter.post('/', (req, res) => {
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

module.exports = blogRouter